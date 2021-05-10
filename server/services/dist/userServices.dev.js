"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bcrypt = require("bcryptjs");

var _require = require("./jwtService"),
    createToken = _require.createToken;

var _require2 = require("../models"),
    User = _require2.User;

var _require3 = require("./email"),
    send = _require3.send;

var _require4 = require("../error/errors"),
    NotFound = _require4.NotFound,
    Unauthorized = _require4.Unauthorized;

var login = function login(email, password) {
  var user, validPassword, token;
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              email: email
            }
          }));

        case 3:
          user = _context.sent;

          if (user) {
            _context.next = 6;
            break;
          }

          throw new Unauthorized("Authentication failed! Email / Password not found!");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compareSync(password, user.password));

        case 8:
          validPassword = _context.sent;

          if (validPassword) {
            _context.next = 11;
            break;
          }

          throw new Unauthorized("Authentication failed! Email / Password not found!");

        case 11:
          token = createToken(user);
          return _context.abrupt("return", {
            OK: true,
            token: token,
            user: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.roleId,
            image: user.image,
            isAdmin: user.isAdmin
          });

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          throw _context.t0;

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

var register = function register(email, password, firstName, lastName) {
  return regeneratorRuntime.async(function register$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findAll({
            where: {
              email: email
            }
          }).then(function _callee(user) {
            var token;
            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(user.length > 0)) {
                      _context2.next = 4;
                      break;
                    }

                    return _context2.abrupt("return", {
                      OK: false,
                      error: "El usuario ya a sido registrado"
                    });

                  case 4:
                    _context2.next = 6;
                    return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

                  case 6:
                    password = _context2.sent;
                    _context2.next = 9;
                    return regeneratorRuntime.awrap(User.create({
                      email: email,
                      password: password,
                      firstName: firstName,
                      lastName: lastName,
                      roleId: 2
                    }));

                  case 9:
                    user = _context2.sent;
                    // ONG should insert subject and text or html template
                    send({
                      to: user.email,
                      subject: "Welcome to ONG",
                      // subject to change
                      text: "Thank for signup to ONG ".concat(user.firstName) // can change this for the template below
                      // html: "<strong> WELCOME </strong>", you can create a template and insert it here

                    });
                    token = createToken(user);
                    return _context2.abrupt("return", {
                      OK: true,
                      token: token,
                      user: user.email,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      role: user.roleId,
                      image: user.image,
                      isAdmin: user.isAdmin
                    });

                  case 13:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          }));

        case 2:
          return _context3.abrupt("return", _context3.sent);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getPersonalInfo = function getPersonalInfo(id) {
  return regeneratorRuntime.async(function getPersonalInfo$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              id: id
            },
            attributes: {
              exclude: "password createdAt updatedAt deletedAt"
            }
          }));

        case 2:
          return _context4.abrupt("return", _context4.sent);

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var deleteUser = function deleteUser(id) {
  var user;
  return regeneratorRuntime.async(function deleteUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findByPk(id));

        case 3:
          user = _context5.sent;
          user.destroy();
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          throw new NotFound("User not found!");

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; //funtion to find all users


var getUserList = function getUserList() {
  var listUsers;
  return regeneratorRuntime.async(function getUserList$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(User.findAll());

        case 2:
          listUsers = _context6.sent;
          return _context6.abrupt("return", listUsers);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var updateUser = function updateUser(req) {
  var idUpd, userUpd, user;
  return regeneratorRuntime.async(function updateUser$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          idUpd = req.params;
          userUpd = req.body;
          _context7.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            where: _objectSpread({}, idUpd),
            fields: ["firstName", "lastName", "roleId"]
          }));

        case 4:
          user = _context7.sent;

          if (user) {
            _context7.next = 7;
            break;
          }

          return _context7.abrupt("return", null);

        case 7:
          _context7.next = 9;
          return regeneratorRuntime.awrap(user.update(_objectSpread({}, userUpd)));

        case 9:
          return _context7.abrupt("return", _objectSpread({}, idUpd, {}, userUpd));

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var findByEmail = function findByEmail(email) {
  return regeneratorRuntime.async(function findByEmail$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              email: email
            }
          }));

        case 2:
          return _context8.abrupt("return", _context8.sent);

        case 3:
        case "end":
          return _context8.stop();
      }
    }
  });
};

module.exports = {
  login: login,
  register: register,
  deleteUser: deleteUser,
  getPersonalInfo: getPersonalInfo,
  getUserList: getUserList,
  updateUser: updateUser,
  findByEmail: findByEmail
};