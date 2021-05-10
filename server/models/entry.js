"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    static associate({ Category }) {
      this.belongsTo(Category, { foreignKey: "categoryId" });
    }
  }
  Entry.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.STRING,
      image: DataTypes.STRING,
      type: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Entry",
      tableName: "Entries",
    }
  );
  return Entry;
};
