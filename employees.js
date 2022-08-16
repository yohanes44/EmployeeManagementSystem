// console.log("EMployee page opened");

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dengene_ems"
});

var arrUsers;

  con.connect(function(err) {
    if (err) throw err;

    else{
            con.query("SELECT * FROM dengene", function(err, result, fields) {
                if(err){
                    throw err;
                }
                  else{
                        arrUsers = result
                        // console.log(arrUsers);
                   }
            });
        }

  });


// const tbody = document.getElementById("tbody");

// const tr = document.createElement("tr");

// const th = document.createElement("th");

// const td1 = document.createElement("td");
// const td2 = document.createElement("td");
// const td3 = document.createElement("td");











                             


exports.module = arrUsers;





                                // firstName: `${result[i].firsetName}`,
                                // lastName: `${result[i].lastName}`,
                                // position: `${result[i].position}`,
                                // salary: `${result[i].salary}`,
                                // phoneNumber: `${result[i].phoneNumber}`,
                                // address: `${result[i].address}`,
                                // email: `${result[i].email}`,