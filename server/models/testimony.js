"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Testimony extends Model {
    static associate(models) {}
  }
  Testimony.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Testimony",
      tableName: "Testimonies",
    }
  );
  return Testimony;
};
