"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Contacts", [
      {
        name: "Pepo Lopez",
        phone: "11-4565-2454",
        email: "email@email.com",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Juan Palotes",
        phone: "11-4565-2454",
        email: "palotes@email.com",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Margarita del Carmen",
        phone: "11-4565-2454",
        email: "delcarmen@email.com",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
