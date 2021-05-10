"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Testimonies", [
      {
        name: "Testimony 1",
        content: "They put the work all up and bring happiness!",
        image: "https://reqres.in/img/faces/9-image.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Testimony 2",
        content:
          "Beautifull job: Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "https://reqres.in/img/faces/10-image.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Testimony 3",
        content:
          "BEST ONG : Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "https://reqres.in/img/faces/8-image.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
