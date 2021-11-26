const { persons } = require("../db");
const { v4: uuidv4 } = require("uuid");
const { getParamsPath } = require("../utils");
const { getAllPersons, getPersonById } = require("../models");
const { validateId } = require("../utils");

const handleGetPersons = (req, res) => {
  try {
    const persons = getAllPersons();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(persons));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Internal server error"
      })
    );
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
    res.writeHead(err.statusCode || 500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message || "Internal server error" }));
  }
};

const handleCreatePerson = (req, res) => {
  try {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      const { name, age, hobbies } = JSON.parse(data);
      const person = { id: uuidv4(), name: name || null, age: age || null, hobbies: hobbies || [] };
      persons.push(person);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(person));
    });
  } catch (err) {
    res.writeHead(err.statusCode || 500, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err.message));
  }
};

const handleUpdatePerson = (req, res) => {};

module.exports = {
  handleGetPerson,
  handleGetPersons,
  handleCreatePerson,
  handleUpdatePerson
};
