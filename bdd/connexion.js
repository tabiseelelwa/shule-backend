const mysql = require("mysql");
const Bdd = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shule",
});

module.exports = Bdd;
