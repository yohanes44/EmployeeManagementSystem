var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dengene_ems"
});

const arrUsers = [];

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM dengene", function (err, result, fields) {
      if (err){
        throw err;
      } 
    // console.log(typeof fields);
    // console.log(result);
   
    for(let i = 0; i<=result.length; i++){
        arrUsers.push(result); //push every record from the table
    }
    console.log(arrUsers[0]);

  });
});

module.exports = arrUsers;