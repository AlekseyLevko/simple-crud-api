const { ValidationError } = require("../errors");

const validatePerson = (person) => {
  const { name, age, hobbies } = person;
  if (typeof name !== "string") throw new ValidationError("Person must have name property of type string");
  if (typeof name === "string" && !name) throw new ValidationError("Name cannot be an empty string");
  if (typeof age !== "number") throw new ValidationError("Person must have age property of type number");
  if (!Array.isArray(hobbies)) throw new ValidationError("Person must have hobbies property of type array");

  person.hobbies.forEach((hobby) => {
    if (typeof hobby !== "string")
      throw new ValidationError("Hobbies property must be empty or contain only string values");
  });

  const extraProperties = [];

  for (let key in person) {
    if (!["name", "age", "hobbies"].includes(key)) extraProperties.push(key);
  }

  if (extraProperties.length) {
    throw new ValidationError(`Person must not contain the following properties '${extraProperties.join(", ")}'`);
  }
};

module.exports = {
  validatePerson
};
