'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Spot, { foreignKey: 'ownerId' });
      User.hasMany(models.Booking, { foreignKey: 'userId' });
      User.hasMany(models.Review, { foreignKey: 'userId' });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            args: [true],
            msg: 'First name is required',
          },
          notNull: {
            args: [true],
            msg: 'First name is required',
          },
        },
      },
      lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            args: [true],
            msg: 'Last name is required',
          },
          notNull: {
            args: [true],
            msg: 'Last name is required',
          },
        },
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.TEXT.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
    }
  );
  return User;
};
