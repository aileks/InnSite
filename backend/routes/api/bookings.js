const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot, SpotImage, Sequelize, Booking } = require('../../db/models');

const Op = Sequelize.Op;

router.use(handleValidationErrors);

router.put('/:bookingId', requireAuth, async (req, res, next) => {
  const { bookingId } = req.params;
  const userId = req.user.id;
  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
    });
  }

  if (userId !== booking.userId) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  let { startDate, endDate } = req.body;
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  const today = new Date();

  if (today.getTime() > booking.endDate.getTime()) {
    return res.status(403).json({
      message: "Past bookings can't be modified",
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
      message: 'Bad Request',
      errors: {
        endDate: 'End date overlaps with start date',
      },
    });
  }

  const conflict = await Booking.findOne({
    where: {
      id: {
        [Op.not]: bookingId,
      },
      spotId: booking.spotId,
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
      delete resObj.errors.startDate;
    } else if (startDateOverlap && !endDateOverlap) {
      delete resObj.errors.endDate;
    }

    return res.status(403).json(resObj);
  }

  await booking.update(req.body);
  await booking.save();

  res.json(booking);
});

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
  const { bookingId } = req.params;
  const userId = req.user.id;

  const booking = await Booking.findOne({
    where: {
      id: bookingId,
    },
    include: {
      model: Spot,
    },
  });

  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
    });
  }

  const validUser = booking.userId === userId;
  const validOwner = booking.Spot.ownerId === userId;

  if (!(validUser || validOwner)) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  const today = new Date();
  if (booking.startDate.getTime() <= today.getTime()) {
    return res.status(403).json({
      message: "Bookings that have been started can't be deleted",
    });
  }

  await booking.destroy();

  res.json({ message: 'Successfully deleted' });
});

router.get('/current', requireAuth, async (req, res, next) => {
  const resBody = [];
  const userId = req.user.id;
  const bookings = await Booking.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'description'],
        },
        include: [
          {
            model: SpotImage,
            attributes: ['url'],
            where: {
              preview: true,
            },
          },
        ],
      },
    ],
  });

  for (let booking of bookings) {
    booking = booking.toJSON();

    console.log(booking);

    booking.Spot.previewImage = booking.Spot.SpotImages[0].url;
    delete booking.Spot.SpotImages;

    resBody.push(booking);
  }

  res.json({
    Bookings: [...resBody],
  });
});

module.exports = router;
