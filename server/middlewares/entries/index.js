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
const _contentRequired = check("content", "Content is required!")
  .isString()
  .not()
  .isEmpty();
const _contentValid = check("content", "Content is required!")
  .isString()
  .not()
  .isEmpty()
  .optional();
const _imageRequired = check("image", "Image must be required!").isURL();
const _imageValid = check("image", "Image must be valid!").isURL().optional();
const _cateogryIdRequired = check("categoryId", "Must enter a Category id!")
  .isNumeric()
  .not()
  .isEmpty();
const _cateogryIdValid = check("categoryId", "Category id must be valid!")
  .isNumeric()
  .not()
  .isEmpty()
  .optional();
const _idExist = check("id", "Must enter a valid id!")
  .isNumeric()
  .not()
  .isEmpty();

const createNewEntry = [
   isAuth,
   middleware.isAdm,
  _nameRequired,
  _contentRequired,
  _imageRequired,
  _cateogryIdRequired,
  validationResult,
];

const updateNew = [
   isAuth,
   middleware.isAdm,
  _idExist,
  _nameValid,
  _contentValid,
  _imageValid,
  _cateogryIdValid,
  validationResult,
];

const deleteNew = [
   isAuth,
   middleware.isAdm,
  _idExist,
  validationResult,
];

module.exports = {
  createNewEntry,
  updateNew,
  deleteNew,
};
