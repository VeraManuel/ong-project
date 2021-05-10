"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Entries", [
      {
        name: "Entry 1",
        content: "Lorem ipsum dolor sit amet!",
        image: "https://picsum.photos/405",
        type: "Community",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Entry 2",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://picsum.photos/401",
        type: "Important",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Entry 3",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun.",
        image: "https://picsum.photos/399",
        type: "Activities",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
