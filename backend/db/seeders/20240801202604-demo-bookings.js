'use strict';

const { isColString } = require('sequelize/lib/utils');
const { Booking, Spot, User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    const spots = await Spot.findAll({
      include: [
        {
          model: User,
          where: {
            username: {
              [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'],
            },
          },
        },
      ],
    });

    const bookings = [
      {
        spotId: spots[0].id,
        userId: spots[1].User.id,
        startDate: '2024-08-04',
        endDate: '2024-08-09',
      },
      {
        spotId: spots[1].id,
        userId: spots[2].User.id,
        startDate: '2024-08-14',
        endDate: '2024-08-19',
      },
      {
        spotId: spots[2].id,
        userId: spots[0].User.id,
        startDate: '2024-10-31',
        endDate: '2024-11-12',
      },
    ];

    for (const booking of bookings) {
      await Booking.create(booking);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;

    const bookings = await Booking.findAll({
      include: [
        {
          model: User,
          where: {
            username: {
              [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'],
            },
          },
        },
      ],
    });

    for (const booking of bookings) {
      await booking.destroy();
    }
  },
};
