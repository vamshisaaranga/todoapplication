const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.join(__dirname, "todoApplication.db");
let db = null;

const InitializingDB = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("SERVER IS RUNNING AT http://localhost/3000");
    });
  } catch (e) {
    console.log(`DB SERVER ERROR${e.message}`);
    process.exit(1);
  }
};
InitializingDB();

//GET when status is TO DO
app.get("/todos/", async (request, response) => {
  const { status } = request.query;
  const getQuery = `
  SELECT
  *
  FROM
  todo
  WHERE
  status LIKE '%${status}%';`;
  const details = await db.all(getQuery);
  response.send(details);
});

//GET WHEN PRIORITY IS HIGH

app.get("/todos/", async (request, response) => {
  const { priority } = request.query;
  const getPriority = `
  SELECT
  *
  FROM
  todo
  WHERE
  priority LIKE '%${priority}%';`;
  const highPriority = await db.get(getPriority);
  response.send(highPriority);
});
//GEt status & priority
app.get("/todos/", async (request, response) => {
  const { priority, status } = request.query;
  const priorityStatusQuery = `
    SELECT
    *
    FROM
    todo
    WHERE
    status LIKE '%${status}' AND
    priority LIKE '%${priority}';`;
  const getTodo = await db.all(priorityStatusQuery);
  response.send(getTodo);
});
