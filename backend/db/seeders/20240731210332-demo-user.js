'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          id: 1,
          email: 'frodo.baggins@middleearth.com',
          username: 'FrodoBaggins',
          firstName: 'Frodo',
          lastName: 'Baggins',
          hashedPassword: bcrypt.hashSync('ringBearer123'),
        },
        {
          id: 2,
          email: 'hagrid@wizardworld.com',
          username: 'Hagrid',
          firstName: 'Rubeus',
          lastName: 'Hagrid',
          hashedPassword: bcrypt.hashSync('magicalCreatures'),
        },
        {
          id: 3,
          email: 'elara.starwind@eldoria.com',
          username: 'ElaraStarwind',
          firstName: 'Elara',
          lastName: 'Starwind',
          hashedPassword: bcrypt.hashSync('moonlightGlimmer'),
        },
        {
          id: 4,
          email: 'aragorn@middleearth.com',
          username: 'Aragorn',
          firstName: 'Aragorn',
          lastName: 'Elessar',
          hashedPassword: bcrypt.hashSync('striderWarrior'),
        },
        {
          id: 5,
          email: 'susan.pevensie@narnia.com',
          username: 'SusanPevensie',
          firstName: 'Susan',
          lastName: 'Pevensie',
          hashedPassword: bcrypt.hashSync('bowAndArrow'),
        },
        {
          id: 6,
          email: 'merlin@legendaria.com',
          username: 'Merlin',
          firstName: 'Merlin',
          lastName: 'TheWizard',
          hashedPassword: bcrypt.hashSync('arcaneMagic'),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            'FrodoBaggins',
            'Hagrid',
            'ElaraStarwind',
            'Aragorn',
            'SusanPevensie',
            'Merlin',
          ],
        },
      },
      {}
    );
  },
};
