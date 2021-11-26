const { persons } = require("../db");
const { DBError } = require("../errors");
const { v4: uuidv4 } = require("uuid");

const getAllPersons = () => {
  return persons;
};

const getPersonById = (id) => {
  const person = persons.find((person) => person.id === id);
  if (!person) throw new DBError(`Person with id '${id}' not found`);
  return person;
};

const createNewPerson = ({ name, age, hobbies }) => {
  const newPerson = { id: uuidv4(), name, age, hobbies };
  persons.push(newPerson);
  return newPerson;
};

const updatePerson = (id, { name, age, hobbies }) => {
  const index = persons.findIndex((person) => person.id === id);
  if (index === -1) throw new DBError(`Person with id '${id}' not found`);
  persons[index] = { ...persons[index], name, age, hobbies };
  return persons[index];
};

module.exports = {
  getAllPersons,
  getPersonById,
  createNewPerson,
  updatePerson
};
