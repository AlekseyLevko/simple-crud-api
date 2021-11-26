const http = require("http");
require("dotenv").config();
const { getParamsPath } = require("./utils");
const { handleCreatePerson, handleGetPerson, handleGetPersons, handleUpdatePerson } = require("./controllers");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const path = req.url;
  const paramsPath = getParamsPath(path);
  const method = req.method;

  if (paramsPath[0] === "person" && paramsPath.length === 1 && method === "GET") {
    handleGetPersons(req, res);
  } else if (paramsPath[0] === "person" && paramsPath.length === 2 && method === "GET") {
    handleGetPerson(req, res);
  } else if (paramsPath[0] === "person" && paramsPath.length === 1 && method === "POST") {
    handleCreatePerson(req, res);
  } else if (paramsPath[0] === "person" && paramsPath.length === 2 && method === "PUT") {
    handleUpdatePerson(req, res);
  } else {
    res.statusCode = 404;
    res.write("Такой страницы не существует");
    res.end();
  }
});

server.listen(port, (error) => {
  error ? console.log(error) : console.log(`Server listens on port ${port}`);
});
