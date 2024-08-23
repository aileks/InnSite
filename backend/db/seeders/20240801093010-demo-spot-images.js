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
        url: 'https://media1.popsugar-assets.com/files/thumbor/UJTw3i-g7xDNCGgEt2QHjjtLc2c/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2017/05/10/784/n/1922441/e9821f6b880f8053_GD_bar/i/Inside-Green-Dragon-Inn-you-can-enjoy-complimentary-drink.jpg',
        preview: true,
      },
      {
        spotId: spotIds[1],
        url: 'https://orlandoinformer.com/wp-content/uploads/2023/08/20230803-DSC07297.jpg',
        preview: true,
      },
      {
        spotId: spotIds[2],
        url: '/images/The_Dragons_Breath_Inn.jpeg',
        preview: true,
      },
      {
        spotId: spotIds[3],
        url: '/images/The_White_City_Tavern.jpeg',
        preview: true,
      },
      {
        spotId: spotIds[4],
        url: '/images/The_Silver_Chair_Inn.jpeg',
        preview: true,
      },
      {
        spotId: spotIds[5],
        url: '/images/The_Enchanted_Haven.jpeg',
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
