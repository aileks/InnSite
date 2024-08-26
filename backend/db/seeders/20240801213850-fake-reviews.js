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
            where: { name: "The Dragon's Breath Inn" },
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
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The Enchanted Haven' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'Merlin' },
          })
        ).id,
        review:
          'A mesmerizing stay at The Enchanted Haven! The magical atmosphere and enchanting decor made my visit truly memorable. The rooms were both comfortable and whimsical, providing a perfect retreat. Highly recommended for those seeking a touch of magic.',
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
            where: { username: 'FrodoBaggins' },
          })
        ).id,
        review:
          'The Leaky Cauldron was quite overwhelming. The atmosphere was noisy and chaotic, far from the cozy, peaceful retreat I was hoping for. The food was lackluster, and the whole experience was disappointing for a quiet hobbit like myself.',
        stars: 2,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: "The Dragon's Breath Inn" },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'Hagrid' },
          })
        ).id,
        review:
          "The Dragon's Breath Inn was a bit of a letdown. The dragon-fire cuisine was too spicy and lacked the hearty, comforting flavors I enjoy. The ambiance was more intense than enchanting, making it a less enjoyable experience than I expected.",
        stars: 3,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The White City Tavern' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'ElaraStarwind' },
          })
        ).id,
        review:
          'The White City Tavern fell short of my expectations. The views were impressive, but the food and service were mediocre. I was hoping for a more refined and enchanting experience, but it felt lackluster overall.',
        stars: 2,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The Silver Chair Inn' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'Aragorn' },
          })
        ).id,
        review:
          'The Silver Chair Inn did not meet my expectations. The silver chair seemed more like a gimmick than a true piece of magic, and the rooms lacked the comfort and quality I anticipated. The experience felt rather ordinary for a place with such a name.',
        stars: 2,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: "The Dragon's Breath Inn" },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'SusanPevensie' },
          })
        ).id,
        review:
          'The Dragon’s Breath Inn was disappointing. The dragon-fire cuisine was too intense and the overall ambiance was more chaotic than magical. I was expecting a more refined and charming experience, but it fell short of that ideal.',
        stars: 1,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The Green Dragon Inn' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'Merlin' },
          })
        ).id,
        review:
          'The Green Dragon Inn was not as enchanting as I hoped. The hobbit ale was underwhelming and the pies were rather bland. The inn lacked the magical touch that would have made it a truly memorable experience.',
        stars: 2,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The Silver Chair Inn' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'FrodoBaggins' },
          })
        ).id,
        review:
          'The Silver Chair Inn was quite a pleasant surprise. The ambiance was cozy, and the staff was friendly. However, the magic seemed a bit too subtle, almost like it was fading. A decent stay, but it didn’t fully capture the magic I was hoping for.',
        stars: 3,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The Green Dragon Inn' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'Hagrid' },
          })
        ).id,
        review:
          'The Green Dragon Inn was alright, I suppose. The ale was good, but the portions were too small for my liking. It’s a cozy spot for a quick pint, but not the best for a hearty meal after a long day of wrangling magical creatures.',
        stars: 3,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The Enchanted Haven' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'ElaraStarwind' },
          })
        ).id,
        review:
          'The Enchanted Haven was everything I could have hoped for and more. The magical energy was palpable, and every detail seemed infused with a mystical touch. The rooms were serene and the service was impeccable. A truly enchanting experience!',
        stars: 5,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: "The Dragon's Breath Inn" },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'Aragorn' },
          })
        ).id,
        review:
          'The Dragon’s Breath Inn was decent enough. The food was hearty and the service was efficient, but it lacked a certain warmth. The atmosphere was more intense than welcoming, which made it feel less like a place to unwind and more like a place to simply pass through.',
        stars: 3,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The White City Tavern' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'SusanPevensie' },
          })
        ).id,
        review:
          'The White City Tavern was quite underwhelming. The views were stunning, but the food and service didn’t match the grandeur. It felt like style over substance, which was disappointing considering the reputation of the place.',
        stars: 2,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The Leaky Cauldron' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'Merlin' },
          })
        ).id,
        review:
          'The Leaky Cauldron is a wonderful spot for those who enjoy a lively atmosphere and a touch of magical chaos. The food was delightful, and the constant buzz of conversation and spells added to the charm. Not the place for quiet contemplation, but perfect for a bit of fun.',
        stars: 4,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The Enchanted Haven' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'FrodoBaggins' },
          })
        ).id,
        review:
          'The Enchanted Haven was nice, but it didn’t quite live up to its name. The decor was charming, and the staff was kind, but the magic felt a bit too subtle. A pleasant stay, but not quite the magical retreat I was expecting.',
        stars: 3,
      },
      {
        spotId: (
          await Spot.findOne({
            where: { name: 'The Leaky Cauldron' },
          })
        ).id,
        userId: (
          await User.findOne({
            where: { username: 'ElaraStarwind' },
          })
        ).id,
        review:
          'The Leaky Cauldron was an interesting experience, but not entirely my style. The atmosphere was a bit too chaotic for my tastes, and the magic felt more haphazard than enchanting. It’s a fun place for some, but not the serene retreat I usually seek.',
        stars: 3,
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
            'The Green Dragon Inn',
            'The Leaky Cauldron',
            "The Dragon's Breath Inn",
            'The White City Tavern',
            'The Silver Chair Inn',
          ],
        },
      },
    });

    const spotIds = spots.map(spot => spot.id);

    const users = await User.findAll({
      where: {
        username: {
          [Op.in]: ['FrodoBaggins', 'Hagrid', 'ElaraStarwind', 'Aragorn', 'SusanPevensie'],
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
