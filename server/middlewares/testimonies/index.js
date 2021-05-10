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
const _contentRequired = check("content", "Content is required!")
  .isString()
  .not()
  .isEmpty();
const _contentValid = check("content", "Content must be valid!")
  .isString()
  .not()
  .isEmpty()
  .optional();
const _imageValid = check("image", "Image must be valid!").isURL().optional();
const _idExist = check("id", "Must enter a valid id!")
  .isNumeric()
  .not()
  .isEmpty();

const createTestimony = [
  isAuth,
  //middleware.isAdm,
  _nameRequired,
  _contentRequired,
  _imageValid,
  validationResult,
];

const testimoniesById = [isAuth, middleware.isAdm, _idExist];

const updateTestimony = [
  isAuth,
  //middleware.isAdm,
  _nameValid,
  _contentValid,
  _imageValid,
  validationResult,
];

module.exports = {
  createTestimony,
  updateTestimony,
  testimoniesById,
};
