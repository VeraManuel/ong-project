class BadRequest extends Error {
  constructor(msg, data) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = 400;
    this.msg = msg || "Bad request: The resource was not requested well";
    this.data = data;
  }
}

class NotFound extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = 404;
    this.msg = message || "Not Found: Resource not found.";
  }
}

class Unauthorized extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = 401;
    this.msg = message || "Unauthorized: You have no authorization to proceed.";
  }
}

module.exports = { BadRequest, NotFound, Unauthorized };
