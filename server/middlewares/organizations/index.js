const { check } = require("express-validator");
const middleware = require("../../middlewares/isAdm");
const { isAuth } = require("../../middlewares/auth.middleware");
const { validationResult } = require("../commons");

const _nameRequired = check("name", "Name is required!")
  .isString()
  .not()
  .isEmpty();
const _nameValid = check("name", "Name must be Valid!")
  .isString()
  .not()
  .isEmpty()
  .optional();
const _imageRequired = check("image", "Image must be Required!").isURL();
const _imageValid = check("image", "Image must be valid!").isURL().optional();
const _addressRequired = check("address", "Address is required!")
  .isString()
  .not()
  .isEmpty();
const _addressValid = check("address", "Address is valid!")
  .isString()
  .not()
  .isEmpty()
  .optional();
const _welcomeTextRequired = check("welcomeText", "Welcome Text is required!")
  .isString()
  .not()
  .isEmpty();
const _welcomeTextValid = check("welcomeText", "Welcome Text is valid!")
  .isString()
  .not()
  .isEmpty()
  .optional();
const _phoneRequired = check("phone", "Phone is required!").isNumeric();
const _phoneValid = check("phone", "Phone is valid!").isNumeric().optional();
const _idExist = check("id", "Must enter a valid id!")
  .isNumeric()
  .not()
  .isEmpty();
const _facebookValid = check("facebook", "Facebook url must be valid")
  .isURL()
  .optional();
const _linkedinValid = check("linkedin", "Linkedin url must be valid")
  .isURL()
  .optional();
const _instagramValid = check("instagram", "Instagram url must be valid")
  .isURL()
  .optional();

const createOrganization = [
  //isAuth,
  //middleware.isAdm,
  _nameRequired,
  _imageRequired,
  _addressRequired,
  _welcomeTextRequired,
  _phoneRequired,
  validationResult,
];

const publicOrganization = [_idExist, validationResult];

const updateOrganization = [
  //isAuth,
  //middleware.isAdm,
  _idExist,
  _nameValid,
  _imageValid,
  _addressValid,
  _welcomeTextValid,
  _phoneValid,
  _facebookValid,
  _linkedinValid,
  _instagramValid,
  validationResult,
];

const deleteOrganization = [_idExist, validationResult];

module.exports = {
  createOrganization,
  publicOrganization,
  updateOrganization,
  deleteOrganization,
};
