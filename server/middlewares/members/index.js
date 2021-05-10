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
const _imageValid = check("image", "Image must be valid!").isURL();
const _idExist = check("id", "Must enter a valid id!")
  .isNumeric()
  .not()
  .isEmpty();

const createNewMember = [
  isAuth,
  middleware.isAdm,
  _nameRequired,
  _nameValid,
  _imageValid, 
  validationResult];

const updateMemberById = [
  isAuth,
  middleware.isAdm,
  _idExist,
  _nameValid,
  _imageValid,
  validationResult,
];

const deleteMemberById = [
  isAuth,
  middleware.isAdm,
  _idExist,
  validationResult,
];

module.exports = {
  createNewMember,
  updateMemberById,
  deleteMemberById,
};
