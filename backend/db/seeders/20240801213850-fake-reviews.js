'use strict';

const { Review, Spot, User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const reviews = [
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The Green Dragon Inn' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'FrodoBaggins' },
          })
        ).id,
        review:
          'A cozy and charming inn! The hobbit ale was delightful and the pies were the best I have ever had. Highly recommend for a peaceful stay in the Shire.',
        stars: 5,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The Leaky Cauldron' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'Hagrid' },
          })
        ).id,
        review:
          'A fantastic place to meet fellow witches and wizards. The atmosphere is magical and the food is quite satisfying. A bit noisy at times, but it adds to the charm.',
        stars: 4,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The Dragon’s Breath Inn' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'ElaraStarwind' },
          })
        ).id,
        review:
          'The best inn in Eldoria! The dragon-fire cuisine was spectacular and the ambiance was enchanting. Perfect for a magical getaway.',
        stars: 5,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The White City Tavern' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'Aragorn' },
          })
        ).id,
        review:
          'A grand tavern with great views of Minas Tirith. The food and service were excellent, though the prices were a bit high. Still, a memorable experience.',
        stars: 4,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The Silver Chair Inn' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'SusanPevensie' },
          })
        ).id,
        review:
          'A lovely inn with a touch of Narnian magic. The silver chair was truly enchanting and the rooms were cozy. A perfect retreat in Narnia.',
        stars: 5,
      },
    ];

    for (const review of reviews) {
      await Review.create(review);
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    const spots = await Spot.findAll({
      where: {
        name: {
          [Sequelize.Op.in]: [
            'The Green Dragon Spot',
            'The Leaky Cauldron',
            'The Dragon’s Breath Spot',
            'The White City Tavern',
            'The Silver Chair Spot',
          ],
        },
      },
    });

    const spotIds = spots.map(spot => spot.id);

    const users = await User.findAll({
      where: {
        username: {
          [Op.in]: [
            'FrodoBaggins',
            'Hagrid',
            'ElaraStarwind',
            'Aragorn',
            'SusanPevensie',
          ],
        },
      },
    });

    const userIds = users.map(user => user.id);

    options.tableName = 'Reviews';

    return queryInterface.bulkDelete(options, {
      spotId: {
        [Op.in]: spotIds,
      },
      userId: {
        [Op.in]: userIds,
      },
    });
  },
};
