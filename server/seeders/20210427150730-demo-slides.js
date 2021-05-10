"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Slides", [
      {
        text: "Lorem ipsum dolor sit amet",
        imageUrl: "https://picsum.photos/500",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "Lorem ipsum dolor sit amet",
        imageUrl: "https://picsum.photos/600",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: "Lorem ipsum dolor sit amet",
        imageUrl: "https://picsum.photos/550",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
