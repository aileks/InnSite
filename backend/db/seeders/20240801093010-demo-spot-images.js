'use strict';

const { Spot, SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const spots = await Spot.findAll();
    const spotIds = [];

    spots.forEach(spot => {
      spotIds.push(spot.id);
    });

    const images = [
      {
        spotId: spotIds[0],
        url: 'fake-image-1',
        preview: true,
      },
      {
        spotId: spotIds[1],
        url: 'fake-image-2',
        preview: true,
      },
      {
        spotId: spotIds[2],
        url: 'fake-image-3',
        preview: true,
      },
      {
        spotId: spotIds[3],
        url: 'fake-image-4',
        preview: true,
      },
      {
        spotId: spotIds[4],
        url: 'fake-image-5',
        preview: true,
      },
    ];

    for (const image of images) {
      await SpotImage.create(image);
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, {
      url: {
        [Op.startsWith]: 'fake-image-',
      },
    });
  },
};
