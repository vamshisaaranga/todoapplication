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

app.get("/todos/?status=TO%20DO", async (request, response) => {
  const { status } = request.query;
  const getQuery = `
  SELECT
  *
  FROM
  todo
  WHERE
  status LIKE '${status}'`;
  const details = await db.get(getQuery);
  response.send(details);
});
