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
        address: '123 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'App Academy',
        description: 'Place where web developers are created',
        price: 123,
        ownerId: (
          await User.findOne({
            where: {
              username: 'Demo-lition',
            },
          })
        ).id,
      },
      {
        address: '456 Sunset Boulevard',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States of America',
        lat: 34.0980031,
        lng: -118.3261728,
        name: 'Hollywood Dreams',
        description: 'Experience the glamour of Hollywood',
        price: 250,
        ownerId: (
          await User.findOne({
            where: {
              username: 'FakeUser1',
            },
          })
        ).id,
      },
      {
        address: '789 Broadway',
        city: 'New York',
        state: 'New York',
        country: 'United States of America',
        lat: 40.7589632,
        lng: -73.9851853,
        name: 'Times Square Loft',
        description: 'Stay in the heart of the city that never sleeps',
        price: 300,
        ownerId: (
          await User.findOne({
            where: {
              username: 'FakeUser2',
            },
          })
        ).id,
      },
      {
        address: '101 Ocean Drive',
        city: 'Miami',
        state: 'Florida',
        country: 'United States of America',
        lat: 25.7742658,
        lng: -80.1307602,
        name: 'Beachfront Paradise',
        description: 'Luxurious condo with stunning ocean views',
        price: 280,
        ownerId: (
          await User.findOne({
            where: {
              username: 'Demo-lition',
            },
          })
        ).id,
      },
      {
        address: '202 Bourbon Street',
        city: 'New Orleans',
        state: 'Louisiana',
        country: 'United States of America',
        lat: 29.9584497,
        lng: -90.0653834,
        name: 'French Quarter Gem',
        description: 'Historic house in the heart of NOLA',
        price: 175,
        ownerId: (
          await User.findOne({
            where: {
              username: 'Demo-lition',
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
        [Op.in]: ['202 Bourbon Street', '101 Ocean Drive', '789 Broadway', '456 Sunset Boulevard', '123 Disney Lane'],
      },
    });
  },
};
