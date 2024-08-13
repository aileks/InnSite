'use strict';

const { Review, ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const reviews = await Review.findAll();
    for (let i = 0; i < 10; i++) {
      const review = reviews[i % 3];
      await review.createReviewImage({
        url: `fake-image-url-${i}`,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: {
        [Op.in]: [1, 2, 3],
      },
      url: {
        [Op.startsWith]: 'fake-image-url-',
      },
    });
  },
};
