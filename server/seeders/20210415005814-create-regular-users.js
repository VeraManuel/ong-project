"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Francisco",
          lastName: "Regular",
          email: "francisco@test.com",
          password:
            "$2a$10$n1FIsNlzrh0UDua9XRDMXehtv6XAw87WCyY8UtFnE4bV8xxGRgUkO",
          roleId: 2,
          image: "https://reqres.in/img/faces/12-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Daniel",
          lastName: "Regular",
          email: "daniel@test.com",
          password:
            "$2a$10$k4be8Ca80yAS7hdmhJ9vdOBOof6enynQNxUyNioyheoNb5OuWQNe2",
          roleId: 2,
          image: "https://reqres.in/img/faces/11-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Flores",
          lastName: "Regular",
          email: "flores@test.com",
          password:
            "$2a$10$YShaTRQCP/yA9Li9jKjOtuXNjhDUZzhuR9btKf8YwoSIEBqNYIKCi",
          roleId: 2,
          image: "https://reqres.in/img/faces/10-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Alejandro",
          lastName: "Regular",
          email: "alejandro@test.com",
          password:
            "$2a$10$JyO0yho8GueU8IXIE5eJo./CdFvYddxJ8Hc0gSUl7uGOPTrjsXWL.",
          roleId: 2,
          image: "https://reqres.in/img/faces/9-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Vanessa",
          lastName: "Regular",
          email: "vanessa@test.com",
          password:
            "$2a$10$bVwXOZBtxW8X1u0Y6eKyB.Djrzs12fBoQhj7zOeu7rRpWiP2PIOqC",
          roleId: 2,
          image: "https://reqres.in/img/faces/8-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Victorio",
          lastName: "Regular",
          email: "victorio@test.com",
          password:
            "$2a$10$/AT.ook8s8JYcZcySyiGdOCe3bMg8VCsT.1lzpi/vlw5FdgNZfVay",
          roleId: 2,
          image: "https://reqres.in/img/faces/7-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Ayleen",
          lastName: "Regular",
          email: "ayleen@test.com",
          password:
            "$2a$10$0oe5bShTH5CswHvoA1Swn.W2TdQv/b4pzMmDUBHA.XCa4rLBWEWQu",
          roleId: 2,
          image: "https://reqres.in/img/faces/6-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Josefina",
          lastName: "Regular",
          email: "josefina@test.com",
          password:
            "$2a$10$KnS85luZWN2dtRWUyBuOpeE7kkz66Me.R5VB.4lTOtNDZUCcFJNIq",
          roleId: 2,
          image: "https://reqres.in/img/faces/5-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Gabriela",
          lastName: "Regular",
          email: "gabriela@test.com",
          password:
            "$2a$10$SMz.FSGeczgxcT3xb028J.w82KsvOKHIyx2w54F3E6vqu25jUX5lK",
          roleId: 2,
          image: "https://reqres.in/img/faces/1-image.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Dumistasio",
          lastName: "Regular",
          email: "dumistasio@test.com",
          password:
            "$2a$10$Ubd0aIW1Pi51bkzVrvrWLeCzobgqKET6t9Bs6Gpn3tIdG6ucWaRES",
          roleId: 2,
          image: "https://reqres.in/img/faces/3-image.jpg",
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
