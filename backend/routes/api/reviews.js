const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const { Review, ReviewImage, User, Spot } = require('../../db/models');

router.use(handleValidationErrors);

router.get('/current', requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const reviews = await Review.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });

  res.json(reviews);
});

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    const review = await Review.findOne({
      where: {
        id: reviewId,
      },
      include: [{ model: ReviewImage }],
    });

    if (!review) {
      return res.status(404).json({
        message: "Review couldn't be found",
      });
    }

    if (review.userId !== userId) {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    if (review.ReviewImages.length === 10) {
      return res.status(403).json({
        message: 'Maximum number of images for this resource was reached',
      });
    }

    const newImage = await review.createReviewImage(req.body);

    res.status(201).json(newImage);
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

router.put('/:reviewId', requireAuth, async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({
        message: "Review couldn't be found",
      });
    }

    if (review.userId !== userId) {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    await review.update(req.body);
    await review.save();

    res.json(review);
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

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    const review = await Review.findOne({
      where: {
        id: reviewId,
      },
    });

    if (!review) {
      return res.status(404).json({
        message: "Review couldn't be found",
      });
    }

    if (review.userId !== userId) {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    await review.destroy();
    res.json({
      message: 'Successfully deleted',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
