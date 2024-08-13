'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notPast(value) {
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0')

          const todayStr = `${year}-${month}-${day}`;

          if (value < todayStr) throw new Error('startDate cannot be in the past');

        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate(value) {
        if (value <= this.startDate) throw new Error('endDate cannot be on or before startDate')
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
