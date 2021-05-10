"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Manuel",
          lastName: "Admin",
          email: "manuel@test.com",
          password:
            "$2a$10$9fOoKzk3BJTJbOHiZfRMCeWB.X/pfJBjhRUzKvOQ19lQEtnQsYVua",
          roleId: 1,
          image: "https://reqres.in/img/faces/1-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Santiago",
          lastName: "Admin",
          email: "santiago@test.com",
          password:
            "$2a$10$yDUZx5BX7Gs5V.gPXBtpzO0YLQD0MhDvhOrhzi1Xa3L0uJoMB6ryS",
          roleId: 1,
          image: "https://reqres.in/img/faces/2-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Gonzalo",
          lastName: "Admin",
          email: "gonzalof@test.com",
          password:
            "$2a$10$CHflLa4tLLrmT7oaw1SxMue9EWtb2KBdctyIa1Mat6q3RFprDKWeq",
          roleId: 1,
          image: "https://reqres.in/img/faces/3-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Gonzalo",
          lastName: "Admin",
          email: "gonzalor@test.com",
          password:
            "$2a$10$YBSKJtXdaOtlI.pCTSTjguDk929E3ga4lvAO3WLFjildpad7SsNAu",
          roleId: 1,
          image: "https://reqres.in/img/faces/4-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Yuliya",
          lastName: "Admin",
          email: "yuliya@test.com",
          password:
            "$2a$10$RaQE1VWQ523KdExITpdDjulmb6g0jfmrPcuNG5aQ.pTWwVIyyIvZq",
          roleId: 1,
          image: "https://reqres.in/img/faces/5-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Joaquin",
          lastName: "Admin",
          email: "joaquin@test.com",
          password:
            "$2a$10$yH.q9jNLjhuqz6Z2iCD/D.9foX2qC7JHHvTZOSb6okGbQ6gcXiJVO",
          roleId: 1,
          image: "https://reqres.in/img/faces/6-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Walter",
          lastName: "Admin",
          email: "walter@test.com",
          password:
            "$2a$10$8kMPMTNM4pS8a0InJ.AlIubiGHNTm4Z7EscC4cC2dgfuzLHnfXZDu",
          roleId: 1,
          image: "https://reqres.in/img/faces/7-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Tomas",
          lastName: "Admin",
          email: "tomasob@test.com",
          password:
            "$2a$10$rEApAtACd4Lqz6Vdb4rf0ehplfPt.WkeR3vqNTUgmINTz3dt24pzG",
          roleId: 1,
          image: "https://reqres.in/img/faces/8-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Sergio",
          lastName: "Admin",
          email: "sergio@test.com",
          password:
            "$2a$10$.NsBwgSSHqyn8sKzpmmDyeIfEEM5SMSQqkzcy1of.uLeqFyLGPX8W",
          roleId: 1,
          image: "https://reqres.in/img/faces/9-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Mauro",
          lastName: "Admin",
          email: "maurop@test.com",
          password:
            "$2a$10$UiuH6y4fLMAk6VEvlvZ1wOxERyunYleCqMmhdukNjtMHk7/qCtPfi",
          roleId: 1,
          image: "https://reqres.in/img/faces/10-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
