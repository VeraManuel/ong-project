const { validationResult } = require("express-validator");
const { BadRequest } = require("../error/errors");

const validResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest("Validation Errors", errors.mapped());
  }
  next();
};

module.exports = {
  validationResult: validResult,
};
