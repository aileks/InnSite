'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, { foreignKey: 'ownerId' });
      Spot.hasMany(models.Booking, { foreignKey: 'spotId' });
      Spot.hasMany(models.Review, { foreignKey: 'spotId' });
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId' });
    }
  }
  Spot.init(
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: 'Street address is required',
          },
          notEmpty: {
            args: [true],
            msg: 'Street address is required',
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: 'City is required',
          },
          notEmpty: {
            args: [true],
            msg: 'City is required',
          },
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: 'State is required',
          },
          notEmpty: {
            args: [true],
            msg: 'State is required',
          },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: 'Country is required',
          },
          notEmpty: {
            args: [true],
            msg: 'Country is required',
          },
        },
      },
      lat: {
        type: DataTypes.NUMERIC,
        allowNull: false,
        validate: {
          min: {
            args: [-90],
            msg: 'Latitude must be within -90 and 90',
          },
          max: {
            args: [90],
            msg: 'Latitude must be within -90 and 90',
          },
        },
      },
      lng: {
        type: DataTypes.NUMERIC,
        allowNull: false,
        validate: {
          min: {
            args: [-180],
            msg: 'Longitude must be within -180 and 180',
          },
          max: {
            args: [180],
            msg: 'Longitude must be within -180 and 180',
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: [true],
            msg: 'Name is required',
          },
          len: {
            args: [0, 49],
            msg: 'Name must be less than 50 characters',
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: 'Description is required',
          },
          notEmpty: {
            args: [true],
            msg: 'Description is required',
          },
        },
      },
      price: {
        type: DataTypes.NUMERIC,
        validate: {
          min: {
            args: [0.01],
            msg: 'Price per day must be a positive number',
          },
        },
      },
      ownerId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Spot',
    }
  );
  return Spot;
};
