"use strict";

var supertest = require('supertest');

var app = require('../app');

var api = supertest(app);

var _require = require('../services/jwtService'),
    createToken = _require.createToken;

var adminUser = {
  id: 1,
  email: "testAdminUser@test.com",
  password: "Testing12345",
  isAdmin: true,
  firstName: "TestUser",
  lastName: "TestUser",
  image: null,
  roleId: 1,
  deletedAt: null,
  createdAt: "2021-04-20T21:06:26.000Z",
  updatedAt: "2021-04-20T21:06:26.000Z"
};
var standardUser = {
  id: 1,
  email: "testStandardUser@test.com",
  password: "Testing12345",
  isAdmin: false,
  firstName: "TestUser",
  lastName: "TestUser",
  image: null,
  roleId: 2,
  deletedAt: null,
  createdAt: "2021-04-20T21:06:26.000Z",
  updatedAt: "2021-04-20T21:06:26.000Z"
};
var memberData = [{
  name: "testMember",
  image: "https://testMember.photolog.com/testMember.jpg"
}, {
  name: "testMember",
  image: "https://testMember.photolog.com/updatedtestMember.jpg"
}, {
  name: "",
  image: "https://testMember.photolog.com/updatedtestMember.jpg"
}, {
  name: "testMember",
  image: ""
}];
var id = 0;
var adminToken = createToken(adminUser);
var standardToken = createToken(standardUser);
test('Admin User Creates new member record and returns new object as JSON', function _callee() {
  var request;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(api.post('/members').send(memberData[0]).set('Authorization', 'Bearer ' + adminToken).expect(200).expect('Content-Type', /application\/json/));

        case 2:
          request = _context.sent;
          expect(request.body.name).toBe(memberData[0].name);
          expect(request.body.image).toBe(memberData[0].image);
          id = request.body.id;

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
test('Standard users not allowed to create new member', function _callee2() {
  var request;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(api.post('/members').send(memberData[1]).set('Authorization', standardToken).expect(403).expect('Content-Type', /application\/json/));

        case 2:
          request = _context2.sent;
          expect(JSON.stringify(request.body)).toBe(JSON.stringify({
            "message": "Not have permission of admin"
          }));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
test('Cannot create member with empty name value', function _callee3() {
  var request;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(api.post('/members').send(memberData[2]).set('Authorization', adminToken).expect(400).expect('Content-Type', /application\/json/));

        case 2:
          request = _context3.sent;
          expect(JSON.stringify(request.body)).toBe(JSON.stringify({
            "ok": false,
            "error": {
              "msg": "Validation Errors",
              "status": 400,
              "data": {
                "name": {
                  "value": "",
                  "msg": "Name is required!",
                  "param": "name",
                  "location": "body"
                }
              }
            }
          }));

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
test('Cannot create member with invalid or empty image url', function _callee4() {
  var request;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(api.post('/members').send(memberData[3]).set('Authorization', adminToken).expect(400).expect('Content-Type', /application\/json/));

        case 2:
          request = _context4.sent;
          expect(JSON.stringify(request.body)).toBe(JSON.stringify({
            "ok": false,
            "error": {
              "msg": "Validation Errors",
              "status": 400,
              "data": {
                "image": {
                  "value": "",
                  "msg": "Image must be valid!",
                  "param": "image",
                  "location": "body"
                }
              }
            }
          }));

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
test('Returns members list as JSON', function _callee5() {
  var request;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(api.get('/members').expect(200).expect('Content-Type', /application\/json/));

        case 2:
          request = _context5.sent;
          expect(request.body[0]).toHaveProperty('id');
          expect(request.body[0]).toHaveProperty('name');
          expect(request.body[0]).toHaveProperty('image');

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
test('Admin Updates member information by ID', function _callee6() {
  var request;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(api.put('/members/' + id).send(memberData[1]).set('Authorization', adminToken).expect(200).expect('Content-Type', /application\/json/));

        case 2:
          request = _context6.sent;
          expect(request.body).toHaveProperty('id');
          expect(request.body).toHaveProperty('name');
          expect(request.body).toHaveProperty('image');

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
});
test('Admin cannot update member information by unexisting ID', function _callee7() {
  var wrongId, request;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          wrongId = 9999;
          _context7.next = 3;
          return regeneratorRuntime.awrap(api.put('/members/' + wrongId).send(memberData[1]).set('Authorization', adminToken).expect(200));

        case 3:
          request = _context7.sent;
          expect(request.body).toBe(null);

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
});
test('Standard user cannot update member information by ID', function _callee8() {
  var request;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(api.put('/members/' + id).send(memberData[1]).set('Authorization', 'Bearer ' + standardToken).expect(403).expect('Content-Type', /application\/json/));

        case 2:
          request = _context8.sent;
          expect(JSON.stringify(request.body)).toBe(JSON.stringify({
            "message": "Not have permission of admin"
          }));

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
});
test('Standard user cannot update member information by ID', function _callee9() {
  var request;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(api.put('/members/' + id).send(memberData[1]).set('Authorization', 'Bearer ' + standardToken).expect(403).expect('Content-Type', /application\/json/));

        case 2:
          request = _context9.sent;
          expect(JSON.stringify(request.body)).toBe(JSON.stringify({
            "message": "Not have permission of admin"
          }));

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
});
test('Cannot update member information by ID with empty name value', function _callee10() {
  var request;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(api.put('/members/' + id).send(memberData[2]).set('Authorization', 'Bearer ' + adminToken).expect(400).expect('Content-Type', /application\/json/));

        case 2:
          request = _context10.sent;
          expect(JSON.stringify(request.body)).toBe(JSON.stringify({
            "ok": false,
            "error": {
              "msg": "Validation Errors",
              "status": 400,
              "data": {
                "name": {
                  "value": "",
                  "msg": "Name is required!",
                  "param": "name",
                  "location": "body"
                }
              }
            }
          }));

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
});
test('Cannot update member information by ID with invalid or empty image url', function _callee11() {
  var request;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(api.put('/members/' + id).send(memberData[3]).set('Authorization', 'Bearer ' + adminToken).expect(400).expect('Content-Type', /application\/json/));

        case 2:
          request = _context11.sent;
          expect(JSON.stringify(request.body)).toBe(JSON.stringify({
            "ok": false,
            "error": {
              "msg": "Validation Errors",
              "status": 400,
              "data": {
                "image": {
                  "value": "",
                  "msg": "Image must be valid!",
                  "param": "image",
                  "location": "body"
                }
              }
            }
          }));

        case 4:
        case "end":
          return _context11.stop();
      }
    }
  });
});
test("Admin deletes member information by ID", function _callee12() {
  var request;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(api["delete"]('/members/' + id).set('Authorization', adminToken).expect(200));

        case 2:
          request = _context12.sent;
          expect(JSON.stringify(request.body)).toBe(JSON.stringify({
            "OK": true,
            "msg": "Deleted"
          }));

        case 4:
        case "end":
          return _context12.stop();
      }
    }
  });
});
test("Admin cannot delete member information with unexisting ID", function _callee13() {
  var wrongId, request;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          wrongId = 9999;
          _context13.next = 3;
          return regeneratorRuntime.awrap(api["delete"]('/members/' + wrongId).set('Authorization', adminToken).expect(200));

        case 3:
          request = _context13.sent;
          expect(JSON.stringify(request.body)).toBe(JSON.stringify({
            "OK": false,
            "error": {}
          }));

        case 5:
        case "end":
          return _context13.stop();
      }
    }
  });
});
test("Standard user cannot delete member information by ID", function _callee14() {
  var request;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(api["delete"]('/members/' + id).set('Authorization', standardToken).expect(403));

        case 2:
          request = _context14.sent;
          expect(JSON.stringify(request.body)).toBe(JSON.stringify({
            "message": "Not have permission of admin"
          }));

        case 4:
        case "end":
          return _context14.stop();
      }
    }
  });
});