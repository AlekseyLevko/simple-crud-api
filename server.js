const http = require("http");
require("dotenv").config();
const { getParamsPath } = require("./utils");
const { handleCreatePerson, handleGetPerson, handleGetPersons, handleUpdatePerson } = require("./controllers");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const path = req.url;
  const paramsPath = getParamsPath(path);
  const method = req.method;

  if (method === "GET" && paramsPath.length === 1 && paramsPath[0] === "person") {
    handleGetPersons(req, res);
  } else if (method === "GET" && paramsPath.length === 2 && paramsPath[0] === "person") {
    handleGetPerson(req, res);
  } else if (method === "POST" && paramsPath.length === 1 && paramsPath[0] === "person") {
    handleCreatePerson(req, res);
  } else if (method === "PUT" && paramsPath.length === 2 && paramsPath[0] === "person") {
    handleUpdatePerson(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Non-existing resource. Check request-method and endpoint"
      })
    );
  }
});

server.listen(port, (error) => {
  error ? console.log(error) : console.log(`Server listens on port ${port}`);
});
