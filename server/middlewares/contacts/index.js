const { check } = require("express-validator");
const middleware = require("../../middlewares/isAdm");
const { isAuth } = require("../../middlewares/auth.middleware");
const { validationResult } = require("../commons");

const _nameRequired = check("name", "Name is required!")
  .isString()
  .not()
  .isEmpty();
const _emailRequired = check("email", "Email is required!").not().isEmpty();
const _emailValid = check("email", "Email is invalid!").isEmail();

const createContact = [
  _nameRequired,
  _emailRequired,
  _emailValid,
  validationResult,
];

const allContacts = [isAuth, middleware.isAdm];

module.exports = {
  createContact,
  allContacts,
};
