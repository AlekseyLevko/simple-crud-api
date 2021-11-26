const { validate } = require("uuid");
const { ValidationError } = require("../errors");

const validateId = (id) => {
  const idIsValid = validate(id);
  if (!idIsValid) throw new ValidationError("id is not uuid");
};

module.exports = {
  validateId
};
