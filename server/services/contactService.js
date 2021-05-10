const Sequelize = require("sequelize");
const { Contact } = require("../models");

const createContact = async (name, phone, email, message) => {
  return await Contact.create({
    name,
    phone,
    email,
    message,
  });
};

const getAllContact = async () => {
  return await Contact.findAll({
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
  });
};

module.exports = {
  createContact,
  getAllContact,
};
