"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Categories", [
      {
        name: "Catetgory 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Catetgory 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Catetgory 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
