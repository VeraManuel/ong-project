const { check } = require("express-validator");
const middleware = require("../../middlewares/isAdm");
const { isAuth } = require("../../middlewares/auth.middleware");
const { validationResult } = require("../commons");

const _nameRequired = check("name", "Name is required!")
  .isString()
  .not()
  .isEmpty();
const _nameValid = check("name", "Name is required!")
  .isString()
  .not()
  .isEmpty()
  .optional();
const _descriptionValid = check("description", "Diescription must be valid!")
  .isString()
  .not()
  .isEmpty()
  .optional();
const _idExist = check("id", "Must enter a valid id!")
  .isNumeric()
  .not()
  .isEmpty();

const crateCategory = [
  // isAuth,
  // middleware.isAdm,
  _nameRequired,
  validationResult,
];

const deleteCategoryById = [
  //isAuth,
  //middleware.isAdm,
  _idExist,
  validationResult,
];

const updateCategoryById = [
  // isAuth,
  // middleware.isAdm,
  _idExist,
  _nameValid,
  _descriptionValid,
  validationResult,
];

module.exports = {
  crateCategory,
  deleteCategoryById,
  updateCategoryById,
};
