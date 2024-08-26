'use strict';

const { Spot, User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const spots = [
      {
        id: 1,
        address: '7 Bag End Lane',
        city: 'Hobbiton',
        state: 'The Shire',
        country: 'Middle-earth',
        lat: -34.50739,
        lng: 149.128232,
        name: 'The Green Dragon Inn',
        description: 'A cozy pub serving hobbit ale and pies',
        price: 15,
        ownerId: (
          await User.findOne({
            where: {
              username: 'FrodoBaggins',
            },
          })
        ).id,
      },
      {
        id: 2,
        address: '44 Diagon Alley',
        city: 'London',
        state: 'The Magical District',
        country: 'Wizarding World',
        lat: 51.5074,
        lng: -0.1278,
        name: 'The Leaky Cauldron',
        description: 'A hidden pub for witches and wizards',
        price: 50,
        ownerId: (
          await User.findOne({
            where: {
              username: 'Hagrid',
            },
          })
        ).id,
      },
      {
        id: 3,
        address: '1233 Edgewater Drive',
        city: 'Eldoria',
        state: 'Eldoria',
        country: 'Mythos Realm',
        lat: 52.3676,
        lng: 4.9041,
        name: "The Dragon's Breath Inn",
        description: 'An inn known for its magical dragon-fire cuisine',
        price: 120,
        ownerId: (
          await User.findOne({
            where: {
              username: 'ElaraStarwind',
            },
          })
        ).id,
      },
      {
        id: 4,
        address: '9 Coursen’s Crossing',
        city: 'Gondor',
        state: 'Minas Tirith',
        country: 'Middle-earth',
        lat: 41.8919,
        lng: 12.5113,
        name: 'The White City Tavern',
        description: 'A grand tavern with views of the White City',
        price: 85,
        ownerId: (
          await User.findOne({
            where: {
              username: 'Aragorn',
            },
          })
        ).id,
      },
      {
        id: 5,
        address: '11 Evergreen Way',
        city: 'Narnia',
        state: 'Aslan’s Land',
        country: 'Narnia',
        lat: 36.7783,
        lng: -119.4179,
        name: 'The Silver Chair Inn',
        description: 'An inn with a magical silver chair and tales of old',
        price: 95,
        ownerId: (
          await User.findOne({
            where: {
              username: 'SusanPevensie',
            },
          })
        ).id,
      },
      {
        id: 6,
        address: '42 Cloud Road',
        city: 'Avalon',
        state: 'Mystic Isles',
        country: 'Legendaria',
        lat: 37.7749,
        lng: -122.4194,
        name: 'The Enchanted Haven',
        description: 'An inn hidden in the clouds, with enchanted amenities',
        price: 150,
        ownerId: (
          await User.findOne({
            where: {
              username: 'Merlin',
            },
          })
        ).id,
      },
    ];

    for (const spot of spots) {
      await Spot.create(spot);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: {
        [Op.in]: [
          '7 Bag End Lane',
          '44 Diagon Alley',
          '1233 Edgewater Drive',
          '9 Coursen’s Crossing',
          '11 Evergreen Way',
          '42 Cloud Road',
        ],
      },
    });
  },
};
