const { getAllPersons, getPersonById, createNewPerson, updatePerson, deletePerson } = require("../models");
const { validateId, validatePerson, getParamsPath, handleError } = require("../utils");

const handleGetPersons = (req, res) => {
  try {
    const persons = getAllPersons();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(persons));
  } catch (err) {
    handleError(err, res);
  }
};

const handleGetPerson = (req, res) => {
  try {
    const path = req.url;
    const paramsPath = getParamsPath(path);
    const id = paramsPath[1];
    validateId(id);
    const person = getPersonById(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(person));
  } catch (err) {
    handleError(err, res);
  }
};

const handleCreatePerson = (req, res) => {
  try {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        const person = JSON.parse(data);
        validatePerson(person);
        const newPerson = createNewPerson(person);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newPerson));
      } catch (err) {
        handleError(err, res);
      }
    });
  } catch (err) {
    handleError(err, res);
  }
};

const handleUpdatePerson = (req, res) => {
  try {
    const path = req.url;
    const paramsPath = getParamsPath(path);
    const id = paramsPath[1];
    validateId(id);
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        const person = JSON.parse(data);
        validatePerson(person);
        const updatedPerson = updatePerson(id, person);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(updatedPerson));
      } catch (err) {
        handleError(err, res);
      }
    });
  } catch (err) {
    handleError(err, res);
  }
};

const handleDeletePerson = (req, res) => {
  try {
    const path = req.url;
    const paramsPath = getParamsPath(path);
    const id = paramsPath[1];
    validateId(id);
    deletePerson(id);
    res.writeHead(204, { "Content-Type": "application/json" });
    res.end();
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  handleGetPerson,
  handleGetPersons,
  handleCreatePerson,
  handleUpdatePerson,
  handleDeletePerson
};
