"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Members",
      [
        {
          name: "Cecilia Mendez",
          image: "https://i.ibb.co/TT5ytBg/Cecilia-Mendez.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Marco Fernandez",
          image: "https://i.ibb.co/L5PcDVn/Marco-Fernandez.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "María Garcia",
          image: "https://i.ibb.co/V93kPxr/Mar-a-Garcia.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "María Irola",
          image: "https://i.ibb.co/8MXq5cf/Mar-a-Irola.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Marita Gomez",
          image: "https://i.ibb.co/SnkGRpM/Marita-Gomez.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Miriam Rodriguez",
          image: "https://i.ibb.co/VLmRXM0/Miriam-Rodriguez.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rodrigo Fuente",
          image: "https://i.ibb.co/Dr9sCBC/Rodrigo-Fuente.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
