const express = require("express");
const path = require("path")
const fs = require("fs");
const mysql = require("mysql");
const router = express.Router();
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const urlencodedParser = bodyParser.urlencoded({extended: false});
const bodyParser = require("body-parser");
const { Console } = require("console");
const { response } = require("express");
const app = express();
// app.use(bodyParser())

app.use(cookieParser());

app.use(express.static("public-admin"));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret"
    })
);
var userInfo;

const  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dengene_ems"
  })   
  
connection.connect(function(err){
     if(err){
          console.log("Error to connect to database");
     }
     else{
             console.log("Connected to the database sucessfully")
     }      
})








function usersViewOtherEmps(response){
    connection.query("SELECT `id`, `firsetName`, `lastName`, `position`, `salary`, `phoneNumber`, `address`, `role`, `email`FROM `dengene`", (error, result)=>{
        if(error){
            console.log("Error fetching data");
        }
        else{
         
                   response.write(`<table class="table table-striped" ng-hide="me" class="table"><thead thead-dark><tr>`)
                    for(var column in result[0]){
                        response.write(`<th scope="col">` + column + `</th>`);
                       
                    }
                    response.write(`<tr></thead>`)
                    for(var row in result){
                        response.write(`<tr>`)
                        for(var column in result[row]){
                            response.write(`<td><label>` + result[row][column] + `</label></td>`)
                        }
                        response.write(`</tr>`)
                    }
                    response.write(`</table>`);
                    response.end();
        }
    })
  
  }


function updatePersonal(upFirstName ,upLastName, upPhoneNumber, upAddress, upEmail, OrginalName){

    let myySql = `UPDATE dengene
         SET firsetName = ?, lastName = ?, phoneNumber = ?, address = ?, email = ?
         WHERE firsetName = ?`;

    let myyVal = [upFirstName, upLastName, upPhoneNumber, upAddress, upEmail, OrginalName];


    connection.query(myySql, myyVal,(err, data)=>{

      if(err){
          console.log("Error From Trying to update Record ");
          console.log(err);

      } 
      else{
         console.log(data);  
         console.log("Record Succesfully updated");  
      }
});    
}




module.exports = {
    updatePersonal,  usersViewOtherEmps
}