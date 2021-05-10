"use strict";

const { verifyToken } = require("../services/jwtService.js");

const isAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({
      OK: false,
      data: {
        status: 401,
        message: "Unauthorized",
      },
    });
  }

  const token = req.headers.authorization;
  const payload = verifyToken(token);

  if (payload.errors) {
    return res.status(401).json({
      data: {
        status: 401,
        message: "The token has expired",
      },
    });
  }

  req.user = payload.sub;
  next();
};

module.exports.isAuth = isAuth;
