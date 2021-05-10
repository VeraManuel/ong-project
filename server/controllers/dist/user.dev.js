"use strict";

var Sequelize = require('sequelize');

var _require = require("express-validator"),
    validationResult = _require.validationResult;

var _require2 = require('bcryptjs'),
    hash = _require2.hash;

var _require3 = require("../services/userServices"),
    login = _require3.login;

var _require4 = require("../models"),
    User = _require4.User;

var authenticateLogin = function authenticateLogin(req, res) {
  var _req$body, email, password, errors, response;

  return regeneratorRuntime.async(function authenticateLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          errors = validationResult(req);
          _context.next = 4;
          return regeneratorRuntime.awrap(login(email, password, errors));

        case 4:
          response = _context.sent;
          return _context.abrupt("return", res.json(response));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

var userRegistration = function userRegistration(req, res) {
  var _req$body2, email, password, firstName, lastName, errors, usedMail, lastname;

  return regeneratorRuntime.async(function userRegistration$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, firstName = _req$body2.firstName, lastName = _req$body2.lastName;
          errors = validationResult(req);
          usedMail = false;

          if (errors.isEmpty()) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            OK: false,
            errors: errors.array()
          }));

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.findAll({
            where: {
              email: email
            }
          }).then(function (user) {
            if (user.length > 0) {
              usedMail = true;
            }
          })["catch"](function (err) {
            res.json({
              OK: false,
              msg: err
            }).status(500);
          }));

        case 7:
          if (!(usedMail === true)) {
            _context2.next = 11;
            break;
          }

          res.json({
            OK: false,
            msg: "El email ingresado ya ha sido registrado "
          }).status(400);
          _context2.next = 16;
          break;

        case 11:
          lastname = lastName;
          _context2.next = 14;
          return regeneratorRuntime.awrap(hash(password, 10));

        case 14:
          password = _context2.sent;
          User.create({
            email: email,
            password: password,
            firstName: firstName,
            lastname: lastname,
            roleId: 1
          }).then(function (user) {
            return res.json({
              user: user
            }).status(201);
          })["catch"](function (err) {
            console.log(err);
            res.send({
              OK: false,
              msg: err
            }).status(500);
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = {
  authenticateLogin: authenticateLogin,
  userRegistration: userRegistration
};