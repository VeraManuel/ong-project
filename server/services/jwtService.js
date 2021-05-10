"use strict";

const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const { jwtConst } = require("../config/const");

const privateKey = fs.readFileSync(
  path.join(__dirname, "../rsa.private"),
  "utf-8"
);
const publicKey = fs.readFileSync(
  path.join(__dirname, "../rsa.public"),
  "utf-8"
);

const createToken = (user) => {
  const token = jwt.sign({ sub: user }, privateKey, jwtConst.sign);

  return token;
};

const verifyToken = (token) => {
  let array = token.split(" ");
  token = array[0]==="Bearer"?array[1]:array[0];
  try {
    return jwt.verify(token, publicKey, jwtConst.verify);
  } catch (e) {
    const data = {
      status: 403,
      message: "validation_error",
      errors: { e },
    };
    return data;
  }
};

module.exports = { createToken, verifyToken };
