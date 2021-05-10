const { check } = require("express-validator");
const { validationResult } = require("../commons");
const userService = require("../../services/userServices");
const middleware = require("../../middlewares/isAdm");
const { isAuth } = require("../../middlewares/auth.middleware");
const { BadRequest } = require("../../error/errors");

const _emailRequired = check("email", "Email is required!").not().isEmpty();
const _emailValid = check("email", "Email is invalid!").isEmail();
const _emailExist = check("email")
  .custom(async (email = "") => {
    const userFound = await userService.findByEmail(email);

    if (userFound) {
      throw new BadRequest("Email already exist in DB");
    }
  })
  .withMessage("Email already exist in DB");
const _passwordRequired = check(
  "password",
  "Password is required and must be more than 6 characters!"
)
  .not()
  .isEmpty()
  .isLength({ min: 6 });

const _firstNameRequired = check("firstName", "First Name is required!")
  .isAlphanumeric()
  .not()
  .isEmpty();

const _lastNameRequired = check("lastName", "Last Name is required!")
  .isAlphanumeric()
  .not()
  .isEmpty();

const loginRequestValidation = [
  _emailRequired,
  _emailValid,
  _passwordRequired,
  validationResult,
];

const registerRequestValidation = [
  _emailRequired,
  _emailValid,
  _emailExist,
  _passwordRequired,
  _firstNameRequired,
  _lastNameRequired,
  validationResult,
];

const getAllUsersRequestValidation = [isAuth, middleware.isAdm];

const deleteUserRequestValidation = [isAuth];

const getPersonalInfoRequestValidation = [isAuth];

const updateUserInfoRequestValidation = [isAuth];

module.exports = {
  loginRequestValidation,
  registerRequestValidation,
  getAllUsersRequestValidation,
  getPersonalInfoRequestValidation,
  updateUserInfoRequestValidation,
  deleteUserRequestValidation,
};
