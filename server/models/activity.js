"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  activity.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: DataTypes.STRING,
      content: DataTypes.TEXT,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "Activities",
      modelName: "Activity",
    }
  );
  return activity;
};
