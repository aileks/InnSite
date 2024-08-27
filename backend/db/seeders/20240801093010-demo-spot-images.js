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
      // Green Dragon Inn
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
              name: 'The Green Dragon Inn',
            },
          })
        ).id,
        url: 'https://3.bp.blogspot.com/-ypQe-XFbbL4/Vz-EaCbQqCI/AAAAAAABgNk/4DQ6Ct-iEIkRWKIHHcIh0DmPNSgsBE8bwCLcB/s1600/DSCF3048-003.jpg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Green Dragon Inn',
            },
          })
        ).id,
        url: 'https://i2.wp.com/amatteroftaste.me/wp-content/uploads/2013/11/IMG_3007.jpg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Green Dragon Inn',
            },
          })
        ).id,
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/30/5a/2f/the-green-dragon-inn.jpg?w=900&h=-1&s=1',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Green Dragon Inn',
            },
          })
        ).id,
        url: 'https://i.pinimg.com/originals/8b/b0/d0/8bb0d0961d34f5c760de38eb983d8b29.png',
        preview: false,
      },
      // Leaky Cauldron
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
              name: 'The Leaky Cauldron',
            },
          })
        ).id,
        url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiKs-_iQcAIyMlc3NKcT7LWjb8KsfEFNXFIlvPxjZwA6OyBv6Dv1kGhUtV8nQ88QKqfve6CfoZuSm_qt3m525Z-IE9FA9YC8BkbsQhbK6NZbBPnTdd2N1woQtLK3fwsjEA3GJM0zz4mqSk/s1600/FullSizeRender.jpg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Leaky Cauldron',
            },
          })
        ).id,
        url: 'https://static.wikia.nocookie.net/harrypotter/images/8/8f/LeakyCauldron_WB_F1_SomeoneOutsideLeakyCauldron_Illust_080615_Land.jpg/revision/latest/scale-to-width-down/1000?cb=20161213212113',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Leaky Cauldron',
            },
          })
        ).id,
        url: 'https://static.wikia.nocookie.net/harrypotter/images/8/8f/LeakyCauldron_WB_F1_SomeoneOutsideLeakyCauldron_Illust_080615_Land.jpg/revision/latest/scale-to-width-down/1000?cb=20161213212113',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Leaky Cauldron',
            },
          })
        ).id,
        url: 'https://i0.wp.com/live.staticflickr.com/4383/36343106524_1f19513ba6_b.jpg?resize=1024%2C642&ssl=1',
        preview: false,
      },
      // Dragon's Breath Inn
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
              name: "The Dragon's Breath Inn",
            },
          })
        ).id,
        url: '/images/Dragons_Breath_Inn/bar.jpeg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: "The Dragon's Breath Inn",
            },
          })
        ).id,
        url: '/images/Dragons_Breath_Inn/bed.jpeg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: "The Dragon's Breath Inn",
            },
          })
        ).id,
        url: '/images/Dragons_Breath_Inn/fireplace.jpeg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: "The Dragon's Breath Inn",
            },
          })
        ).id,
        url: '/images/Dragons_Breath_Inn/meals.jpeg',
        preview: false,
      },
      // White City Tavern
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
              name: 'The White City Tavern',
            },
          })
        ).id,
        url: '/images/White_City_Tavern/games.jpeg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The White City Tavern',
            },
          })
        ).id,
        url: '/images/White_City_Tavern/bed.jpeg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The White City Tavern',
            },
          })
        ).id,
        url: '/images/White_City_Tavern/bar.jpeg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The White City Tavern',
            },
          })
        ).id,
        url: '/images/White_City_Tavern/meals.jpeg',
        preview: false,
      },
      // Silver Char Inn
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Silver Chair Inn',
            },
          })
        ).id,
        url: '/images/Silver_Chair/building.jpeg',
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
        url: '/images/Silver_Chair/lounge.jpeg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Silver Chair Inn',
            },
          })
        ).id,
        url: '/images/Silver_Chair/bed.jpeg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Silver Chair Inn',
            },
          })
        ).id,
        url: '/images/Silver_Chair/meals.jpeg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Silver Chair Inn',
            },
          })
        ).id,
        url: '/images/Silver_Chair/cellar.jpeg',
        preview: false,
      },
      // Enchanted Haven
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
        url: '/images/Enchanted_Haven/lounge.jpeg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Enchanted Haven',
            },
          })
        ).id,
        url: '/images/Enchanted_Haven/hall.jpeg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Enchanted Haven',
            },
          })
        ).id,
        url: '/images/Enchanted_Haven/garden.jpeg',
        preview: false,
      },
      {
        spotId: (
          await Spot.findOne({
            where: {
              name: 'The Enchanted Haven',
            },
          })
        ).id,
        url: '/images/Enchanted_Haven/bed.jpeg',
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
