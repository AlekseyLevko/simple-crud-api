const { persons } = require("../db");
const { DBError } = require("../errors");

const getAllPersons = () => {
  return persons;
};

const getPersonById = (id) => {
  const person = persons.find((person) => person.id === id);
  if (!person) throw new DBError(`Person with id "${id}" not found`);
  return person;
};

module.exports = {
  getAllPersons,
  getPersonById
};
