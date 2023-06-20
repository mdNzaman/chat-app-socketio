const mysql = require("mysql");

const dbCon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "chat_app",
});

dbCon.connect((err) => {
  if (err) console.log(err);
  else console.log("Database connected successfully!!..");
});

module.exports = dbCon;
