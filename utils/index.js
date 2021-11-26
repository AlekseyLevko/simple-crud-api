const { normalizeUrl } = require("./normalizeUrl");
const { getPersonId } = require("./getPersonId");
const { getParamsPath } = require("./getParamsPath");
const { validateId } = require("./validateId");
const { validatePerson } = require("./validatePerson");
const { handleError } = require("./handleError");

module.exports = {
  normalizeUrl,
  getPersonId,
  getParamsPath,
  validateId,
  validatePerson,
  handleError
};
