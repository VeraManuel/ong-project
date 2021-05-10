const Sequelize = require("sequelize");
const express = require("express");
const { createContact, getAllContact } = require("../services/contactService.js");

const createNewContact = async (req, res, next) => {
  const { name, phone, email, message } = req.body;

  try {
    const contact = await createContact(name, phone, email, message);

    return res.json({
      OK: true,
      data: contact,
    });
  } catch (error) {
    next(error)
  }
};

const getContacts = async (req, res, next) => {
  try {
    const contact = await getAllContact();

    res.status(200).json({
      OK: true,
      data: contact
    });
    
  } catch(error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createNewContact,
  getContacts,
};
