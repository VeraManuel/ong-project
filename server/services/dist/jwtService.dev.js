"use strict";

var jwt = require("jsonwebtoken");

var path = require("path");

var fs = require("fs");

var _require = require("../config/const"),
    jwtConst = _require.jwtConst;

var privateKey = fs.readFileSync(path.join(__dirname, "../rsa.private"), "utf-8");
var publicKey = fs.readFileSync(path.join(__dirname, "../rsa.public"), "utf-8");

var createToken = function createToken(user) {
  var token = jwt.sign({
    sub: user
  }, privateKey, jwtConst.sign);
  return token;
};

var verifyToken = function verifyToken(token) {
  var array = token.split(" ");
  token = array[0] === "Bearer" ? array[1] : array[0];

  try {
    return jwt.verify(token, publicKey, jwtConst.verify);
  } catch (e) {
    var data = {
      status: 403,
      message: "validation_error",
      errors: {
        e: e
      }
    };
    return data;
  }
};

module.exports = {
  createToken: createToken,
  verifyToken: verifyToken
};