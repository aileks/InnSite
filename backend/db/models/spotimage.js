'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId'})
    }
  }
  SpotImage.init({
    spotId: DataTypes.INTEGER,
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preview: {
      type: DataTypes.BOOLEAN,
      validate: {
        async hasPreview(val) {
          const previewImage = await SpotImage.findOne({
            where: {
              spotId: this.spotId,
              preview: true
            }
          });

          if (previewImage && val) {
            throw new Error('Only one preview image allowed');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
