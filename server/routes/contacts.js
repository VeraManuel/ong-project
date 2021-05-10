const express = require("express");
const router = express.Router();
const { createContact, allContacts } = require("../middlewares/contacts");
const { createNewContact, getContacts } = require("../controllers/contact.js");

/* POST almacenar contactos */
router.post("/", createContact, createNewContact);

router.get("/", allContacts, getContacts);

module.exports = router;
