var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "usuarios_wordle"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM usuarios", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});