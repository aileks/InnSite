const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const {
  Spot,
  Booking,
  Review,
  ReviewImage,
  SpotImage,
  Sequelize,
  User,
} = require('../../db/models');

const Op = Sequelize.Op;

router.use(handleValidationErrors);

router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: Review,
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
          },
          {
            model: ReviewImage,
            attributes: ['id', 'url'],
          },
        ],
      },
    ],
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  res.json({
    Reviews: spot.Reviews,
  });
});

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const userId = req.user.id;

  const spot = await Spot.findOne({
    where: { id: spotId },
    include: [
      {
        model: Booking,
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
          },
        ],
      },
    ],
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (userId === spot.ownerId) {
    res.json({
      Bookings: spot.Bookings,
    });
  } else {
    const resBody = [];
    for (let booking of spot.Bookings) {
      booking = booking.toJSON();
      delete booking.User;
      delete booking.id;
      delete booking.userId;
      delete booking.createdAt;
      delete booking.updatedAt;
      resBody.push(booking);
    }

    res.json({
      Bookings: [...resBody],
    });
  }
});

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { spotId } = req.params;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    const spot = await Spot.findOne({
      where: {
        id: spotId,
      },
      include: [
        {
          model: Booking,
        },
      ],
    });

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    if (userId === spot.ownerId) {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }
    const today = new Date();

    if (startDate.getTime() >= endDate.getTime()) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: {
          endDate: 'End date cannot be on or before start date',
        },
      });
    }

    if (startDate.getTime() <= today.getTime()) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: {
          startDate: 'Start date cannot be in the past',
        },
      });
    }

    if (endDate.getTime() <= startDate.getTime()) {
      return res.status(400).json({
        errors: {
          startDate: 'End date overlaps with start date',
        },
      });
    }

    const conflict = await Booking.findOne({
      where: {
        spotId,
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [startDate, endDate],
            },
          },
          {
            endDate: {
              [Op.between]: [startDate, endDate],
            },
          },
          {
            [Op.and]: {
              startDate: {
                [Op.lte]: startDate,
              },
              endDate: {
                [Op.gte]: endDate,
              },
            },
          },
        ],
      },
    });

    if (conflict) {
      const resObj = {
        message: 'Sorry, this spot is already booked for the specified dates',
        errors: {
          startDate: 'Start date conflicts with an existing booking',
          endDate: 'End date conflicts with an existing booking',
        },
      };

      const endDateOverlap = endDate <= conflict.endDate;
      const startDateOverlap = startDate >= conflict.startDate;

      if (endDateOverlap && !startDateOverlap) {
        resObj.errors.startDate = undefined;
      } else if (startDateOverlap && !endDateOverlap) {
        resObj.errors.endDate = undefined;
      }

      return res.status(403).json(resObj);
    }

    const newBooking = await Booking.create({
      ...req.body,
      spotId: +spotId,
      userId,
    });

    res.status(201).json(newBooking);
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      res.status(400).json({
        message: 'Bad Request',
        errors: {
          [err.errors[0].path]: err.errors[0].message,
        },
      });
    }
  }
});

router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
  try {
    const { spotId } = req.params;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: Review,
        },
      ],
    });

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    if (spot.Reviews.find(review => review.userId === userId)) {
      return res.status(500).json({
        message: 'User already has a review for this spot',
      });
    }

    const newReview = await spot.createReview({
      ...req.body,
      userId,
    });

    res.status(201).json(newReview);
  } catch (err) {
    // if (err instanceof Sequelize.ValidationError) {
    //   res.status(400).json({
    //     message: 'Bad Request',
    //     errors: {
    //       [err.errors[0].path]: err.errors[0].message,
    //     },
    //   });
    // }
    next(err);
  }
});

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  try {
    const { spotId } = req.params;
    const userId = req.user.id;
    const spot = await Spot.findOne({
      where: {
        id: spotId,
      },
      include: [
        {
          model: SpotImage,
        },
      ],
    });

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    if (spot.ownerId !== userId) {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    const newImage = await spot.createSpotImage(req.body);

    res.status(201).json(newImage);
  } catch (err) {
    // if (err instanceof Sequelize.ValidationError) {
    //   res.status(400).json({
    //     message: err.message,
    //   });
    // }
    next(err);
  }
});

router.get('/current', requireAuth, async (req, res) => {
  const resBody = [];
  const id = req.user.id;
  const userSpots = await Spot.findAll({
    where: {
      ownerId: id,
    },
    include: [
      {
        model: SpotImage,
      },
      {
        model: Review,
        attributes: ['stars'],
      },
    ],
  });

  for (let spot of userSpots) {
    spot = spot.toJSON();
    let totalStars = 0;
    spot.Reviews.forEach(review => {
      totalStars += review.stars;
    });

    const avgRating = totalStars / spot.Reviews.length;
    spot.avgRating = avgRating;

    const previewImages = spot.SpotImages.find(image => image.preview);
    if (previewImages) spot.previewImage = previewImages.url;

    delete spot.Reviews;
    delete spot.SpotImages;
    resBody.push(spot);
  }

  res.json({
    Spots: [...resBody],
  });
});

router.get('/:spotId', async (req, res, next) => {
  try {
    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: SpotImage,
        },
        {
          model: Review,
          attributes: ['stars'],
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    spot = spot.toJSON();

    let totalStars = 0;
    if (spot.Reviews.length) {
      spot.Reviews.forEach(review => {
        totalStars += review.stars;
      });

      const avgRating = totalStars / spot.Reviews.length;
      spot.avgStarRating = avgRating;
    } else {
      spot.avgStarRating = null;
    }

    spot.Owner = spot.User;
    spot.numReviews = spot.Reviews.length;
    delete spot.Reviews;
    delete spot.User;

    // const {
    //   id,
    //   ownerId,
    //   address,
    //   city,
    //   state,
    //   country,
    //   lat,
    //   lng,
    //   name,
    //   description,
    //   price,
    //   createdAt,
    //   updatedAt,
    //   numReviews,
    //   avgStarRating,
    //   SpotImages,
    //   Owner,
    // } = spot;

    // res.json({
    //   id,
    //   ownerId,
    //   address,
    //   city,
    //   state,
    //   country,
    //   lat,
    //   lng,
    //   name,
    //   description,
    //   price,
    //   createdAt,
    //   updatedAt,
    //   numReviews,
    //   avgStarRating,
    //   SpotImages,
    //   Owner,
    // });

    res.json(spot);
  } catch (err) {
    next(err);
  }
});

router.put('/:spotId', requireAuth, async (req, res, next) => {
  try {
    const { spotId } = req.params;
    const ownerId = req.user.id;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== ownerId) {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    await spot.update(req.body);
    await spot.save();

    res.json(spot);
  } catch (err) {
    // if (err instanceof Sequelize.ValidationError) {
    //   res.status(400).json({
    //     message: err.message,
    //   });
    // }
    next(err);
  }
});

router.delete('/:spotId', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const userId = req.user.id;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== userId) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  await spot.destroy();
  res.json({
    message: 'Successfully deleted',
  });
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    const ownerId = req.user.id;

    const newSpot = await Spot.create({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      ownerId,
    });

    res.status(201).json(newSpot);
  } catch (err) {
    // if (err instanceof Sequelize.ValidationError) {
    //   res.status(400).json({
    //     message: err.message,
    //   });
    // }
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const resBody = [];
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
      req.query;

    const errors = {};

    if (page < 1) errors.page = 'Page must be greater than or equal to 1';
    if (size < 1 || size > 20) errors.size = 'Size must be between 1 and 20';
    if (minLat && (isNaN(minLat) || +minLat < -90 || +minLat > 90))
      errors.minLat = 'Minimum latitude is invalid';
    if (maxLat && (isNaN(maxLat) || +maxLat < -90 || +maxLat > 90))
      errors.maxLat = 'Maximum latitude is invalid';
    if (minLng && (isNaN(minLng) || +maxLng < -180 || +maxLng > 180))
      errors.minLng = 'Minimum longitude is invalid';
    if (maxLng && (isNaN(maxLng) || +maxLng < -180 || +maxLng > 180))
      errors.maxLng = 'Maximum longitude is invalid';
    if (minPrice && (isNaN(minPrice) || +minPrice < 0))
      errors.minPrice = 'Minimum price must be greater than or equal to 0';
    if (maxPrice && (isNaN(maxPrice) || +maxPrice < 0))
      errors.maxPrice = 'Maximum price must be greater than or equal to 0';

    if (Object.keys(errors).length) {
      return res.status(400).json({
        message: 'Bad Request',
        errors,
      });
    }

    page = Number(page) || 1;
    size = Number(size) || 20;

    const where = {};

    if (minLat && maxLat) {
      where.lat = {
        [Op.between]: [minLat, maxLat],
      };
    } else if (minLat) {
      where.lat = {
        [Op.gte]: minLat,
      };
    } else if (maxLat) {
      where.lat = {
        [Op.lte]: maxLat,
      };
    }

    if (minLng && maxLng) {
      where.lng = {
        [Op.between]: [minLng, maxLng],
      };
    } else if (minLng) {
      where.lng = {
        [Op.gte]: minLng,
      };
    } else if (maxLng) {
      where.lng = {
        [Op.lte]: maxLng,
      };
    }

    if (minPrice && maxPrice) {
      where.price = {
        [Op.between]: [minPrice, maxPrice],
      };
    } else if (minPrice) {
      where.price = {
        [Op.gte]: minPrice,
      };
    } else if (maxPrice) {
      where.price = {
        [Op.lte]: maxPrice,
      };
    }

    const spots = await Spot.findAll({
      where,
      include: [
        {
          model: Review,
        },
        {
          model: SpotImage,
        },
      ],
      limit: size,
      offset: (page - 1) * size,
    });

    for (let spot of spots) {
      spot = spot.toJSON();
      let totalStars = 0;
      spot.Reviews.forEach(review => {
        totalStars += review.stars;
      });

      const avgRating = totalStars / spot.Reviews.length;
      spot.avgRating = avgRating;

      const previewImages = spot.SpotImages.find(image => image.preview);
      if (previewImages) spot.previewImage = previewImages.url;

      spot.lng = Number(spot.lng);
      spot.lat = Number(spot.lat);
      spot.price = Number(spot.price);

      delete spot.Reviews;
      delete spot.SpotImages;
      resBody.push(spot);
    }

    res.json({
      Spots: [...resBody],
      page: +page,
      size: +size,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
