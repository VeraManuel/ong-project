"use strict";
const { Model } = require("sequelize");
const { ADMIN_ROLE } = require("../constants");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, { as: "role" });
    }

    admin = ADMIN_ROLE;
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
      isAdmin: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.roleId === this.admin;
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
