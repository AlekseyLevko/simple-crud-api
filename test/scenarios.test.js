const http = require("http");
require("dotenv").config();

const port = process.env.TEST_PORT || 4000;

const person = {
  name: "Alex",
  age: 27,
  hobbies: ["architecture", "cars", "travelling"]
};

let personId = "";

const createOptions = (path, method, data) => {
  return {
    hostname: "localhost",
    port,
    path,
    method,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data)
    }
  };
};

test("Should get an empty array", (done) => {
  http.get(`http://localhost:${port}/person`, (res) => {
    expect(res.statusCode).toBe(200);
    let rawData = "";
    res.on("data", (data) => {
      rawData += data;
    });

    res.on("end", () => {
      const parsedData = JSON.parse(rawData);
      expect(parsedData).toEqual([]);
      done();
    });
  });
});

test("Should create new person and get response", (done) => {
  const postData = JSON.stringify(person);

  const options = createOptions("/person", "POST", postData);

  const req = http.request(options, (res) => {
    expect(res.statusCode).toBe(201);
    let rawData = "";

    res.on("data", (chunk) => {
      rawData += chunk;
    });

    res.on("end", () => {
      const parsedData = JSON.parse(rawData);
      personId = parsedData.id;
      const personWithId = { id: parsedData.id, ...person };
      expect(parsedData).toEqual(personWithId);
      done();
    });
  });

  req.write(postData);
  req.end();
});

test("Should get created person", (done) => {
  http.get(`http://localhost:${port}/person/${personId}`, (res) => {
    expect(res.statusCode).toBe(200);
    let rawData = "";
    res.on("data", (data) => {
      rawData += data;
    });

    res.on("end", () => {
      const parsedData = JSON.parse(rawData);
      expect(parsedData).toEqual({ id: personId, ...person });
      done();
    });
  });
});

test("Should update created person and get response", (done) => {
  const updatedPerson = {
    name: "Aleksey",
    age: 27,
    hobbies: ["billiards", "programming"]
  };
  const putData = JSON.stringify(updatedPerson);

  const options = createOptions(`/person/${personId}`, "PUT", putData);

  const req = http.request(options, (res) => {
    expect(res.statusCode).toBe(200);
    let rawData = "";

    res.on("data", (chunk) => {
      rawData += chunk;
    });

    res.on("end", () => {
      const parsedData = JSON.parse(rawData);
      const updatedPersonWithId = { id: parsedData.id, ...updatedPerson };
      expect(parsedData).toEqual(updatedPersonWithId);
      done();
    });
  });

  req.write(putData);
  req.end();
});

test("Should delete created person", (done) => {
  const options = createOptions(`/person/${personId}`, "DELETE", "");

  const req = http.request(options, (res) => {
    expect(res.statusCode).toBe(204);
    done();
  });

  req.end();
});

test("Try to get deleted person. Should get error message", (done) => {
  http.get(`http://localhost:${port}/person/${personId}`, (res) => {
    expect(res.statusCode).toBe(404);
    let rawData = "";
    res.on("data", (data) => {
      rawData += data;
    });

    res.on("end", () => {
      const parsedData = JSON.parse(rawData);
      expect(parsedData).toEqual({
        error: `Person with id '${personId}' not found`
      });
      done();
    });
  });
});
