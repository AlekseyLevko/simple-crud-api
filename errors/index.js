class HTTPError extends Error {
  constructor(message) {
    super(message);
    this.name = "HTTPError";
  }
}

class ValidationError extends HTTPError {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

class DBError extends HTTPError {
  constructor(message) {
    super(message);
    this.name = "DBError";
    this.statusCode = 404;
  }
}

module.exports = {
  ValidationError,
  DBError
};
