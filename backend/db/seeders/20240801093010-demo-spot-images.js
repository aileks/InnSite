'use strict';

const { Spot, SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const images = [
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Green Dragon Inn',
            },
          })
        ).id,
        url: 'https://media1.popsugar-assets.com/files/thumbor/UJTw3i-g7xDNCGgEt2QHjjtLc2c/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2017/05/10/784/n/1922441/e9821f6b880f8053_GD_bar/i/Inside-Green-Dragon-Inn-you-can-enjoy-complimentary-drink.jpg',
        preview: true,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Leaky Cauldron',
            },
          })
        ).id,
        url: 'https://orlandoinformer.com/wp-content/uploads/2023/08/20230803-DSC07297.jpg',
        preview: true,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: "The Dragon's Breath Inn",
            },
          })
        ).id,
        url: '/images/Dragons_Breath_Inn/building.jpeg',
        preview: true,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The White City Tavern',
            },
          })
        ).id,
        url: '/images/White_City_Tavern/building.jpeg',
        preview: true,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Silver Chair Inn',
            },
          })
        ).id,
        url: '/images/Silver_Chair_Inn/building.jpeg',
        preview: true,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Enchanted Haven',
            },
          })
        ).id,
        url: '/images/Enchanted_Haven/building.jpeg',
        preview: true,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Enchanted Haven',
            },
          })
        ).id,
        url: '/images/Enchanted_Haven/inside.jpeg',
        preview: false,
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
