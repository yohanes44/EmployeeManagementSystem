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

const { updatePersonal,  usersViewOtherEmps } = require("./controllers/userFunctions");

const {   fetchDataAdmin, 
  fetchDataDelete,
  adminDelete,
  updateAdmin,
  fetchDataUpdateAdmin} = require("./controllers/adminFunctions");


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

app.get("/admin", (req,res)=>{
  // console.log(res);
    fetchDataAdmin(res);
    console.log("Done Displaying The Data for Admin");
})


app.get("/", function(req, res){
    res.sendFile(__dirname + "/login.html")
})


app.get("/home", function(req, res){
    res.sendFile(__dirname + "/home.html")
})

app.get("/adminRegister", (req, res)=>{
    res.sendFile(__dirname + "/adminRegister.html");
})

app.get("/adminHome", (req, res)=>{
  res.sendFile(__dirname + "/adminHome.html");
})


app.get("/adminRegister", (req,res)=>{
  res.sendFile(__dirname + "/adminRegister.html");

})

app.post("/adminRegister", bodyParser.urlencoded({extended: false}))
app.post("/adminRegister",(req, res)=>{
   const fName = req.body.firstName;
   const lName = req.body.lastName;
   const pos = req.body.position;
   const sal = req.body.salary;
   const phone = req.body.phoneNumber;
   const add = req.body.address;
   const role = req.body.role;
   const em = req.body.email;
   const pass = req.body.password;

   console.log(fName + " " + lName + " " + pos + " " + sal + " " + phone + " " + add + " " + role + " " + em + " " + pass);

    const stmt = 'INSERT INTO dengene (firsetName, lastName, position, salary, phoneNumber, address, role, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const myValues = [fName, lName, pos, sal, phone, add, role, em, pass];


 
    connection.query(stmt, myValues, function(error, results){
          if(error){
            console.log(error);
         }
         else{
            console.log("Record Inserted Succesfully");
            // 
            res.redirect("/adminHome");
            res.end();
         }
        // 
    })
})

app.post("/login", bodyParser.urlencoded({extended: false}))


app.post("/login", (req, res)=>{
  const myEm = req.body.loginEmail;
  const myPass = req.body.loginPassword;
  const query = 'SELECT * FROM `dengene` WHERE email =? AND password=?';
  const myValue = [myEm,myPass];
    const editedFirstName = req.body.fNameEdit;
    const editedLastName = req.body.lNameEdit;
    const addressEdit = req.body.addressEdit;
    const emailEdit = req.body.emailEdit;


  connection.query(query, myValue,(err, data)=>{

      if(err){
          console.log("Error Loginng IN");
          console.log(err);
      }
      else{
         
          if(data.length>0){
                        
                if(data[0].role == "admin"){
                 
                  const userName = data[0].firsetName;
                  console.log("ADMIN LOGGED IN");
              
                  res.redirect('/admin');
                 return res.end();
                }

                if(data[0].role == "user"){
               
                      var sortedArray = data.filter((dat)=>{dat.email == myEm} );
                      console.log("Sorted Array");
                      console.log(data[0]);
                      userInfo = data[0];
                      usersViewOtherEmps(res);
                     
          
                      res.write(`<!DOCTYPE html>
                      <html lang="en">
                        <head>
                          <meta charset="UTF-8">
                          <meta http-equiv="X-UA-Compatible" content="IE=edge">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>User Page</title>
          
                          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">    
                          <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
                          <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
                          <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.28//angular-route.min.js"></script>                     
                          <script>
                          $(function(){
                             $('#nav').load("header.html");
                          });
                          </script>
                          <style>
                            .homePage{
                                width: 50%;
                              }
                            body{
                              background: 
                            }
                            .myProfile,
                            .otherEmps{
                              border: 0px solid white;
                            }
                            table, th, td {
                              border: 1px solid black;
                            }
                            .logo{
                              text-indent: -99px;
                              background: url('dengeneLogo.png');
                              width: 50px;
                              height:70px;
                              background: yellow;
                             }
    
                             .header{
                                display: flex;
                                background: rgb(141, 176, 78); 
                                padding: 16px;
                                justify-content: space-between;
                                font-size: 30px;
                             }
                             .userNav{
                                display: flex;
                                gap: 25px;
                                background: rgb(141, 176, 78); 
                                background-color: rgb(141, 176, 78);
                             }
                             button{
                              border-radius: 20%;
                             }
                         </style>

                        </head>
                        <body ng-app="app" ng-controller="ctrl">
      
                        <div id="nav"></div>
                        <!-- 
                       remove header
      

                        below
                        remove header -->
      
                          <div>
                          
        
                  </div>`);  
                      res.write(`<div class="header"> 
                             <div><strong>Welcome ${data[0].firsetName}</strong></div>
                             <div style="color: white"><strong>Dengene</strong></div>    
                      </div>`);
                   
                      res.write(`<table ng-show="me" class="table"><thead><tr><th scope="col">First Name</th><th scope="col">Last Name</th><th scope="col">Position</th><th scope="col">Salary</th><th scope="col">Phone Number</th><th scope="col">address</tr></thead>`);
                      res.write(`<tbody><tr><td>${data[0].firsetName}</td><td>${data[0].lastName}</td><td>${data[0].position}</td><td>${data[0].salary}</td><td>${data[0].phoneNumber}</td><td>${data[0].address}</td></tr></tbody>`);
                     

                      res.write(`<div class="userNav"><button class="myProfile" ng-click="Mee()">My Profile</button>
                                 <button class="otherEmps" ng-click="Other()">Other Employees</button></div>`)     


              
                      res.write(`</table>`)

                      
//Update Users Data
                       res.write(`<div ng-show="me">
                   <form action="/updatePerson" method="post" id="form">
                     
                   <div class="mb-2" ng-show="false">
                     <input type="text" name="PersonToBeUpdated" class="form-control" value="${data[0].firsetName}" id="PersonToBeUpdated">
                   </div>
                    
                    <div class="form-group row">
                       <label for="fNameEdit" class="col-sm-2 col-form-label">Edit FirstName</label>
                       <div class="col-sm-7">
                          <input type="text" name="fNameEdit"  value="${data[0].firsetName}" class="form-control" id="fNameEdit">
                        </div> 
                    </div>


                     <div class="form-group row">
                         <label for="lNameEdit" class="col-sm-2 col-form-label">Edit lastName</label>
                         <div class="col-sm-7">
                            <input type="text" name="lNameEdit" value="${data[0].lastName}" class="form-control" id="lNameEdit">
                          </div>
                      </div>
                      

                     <div class="form-group row">
                         <label for="phoneNumberEdit" class="col-sm-2 col-form-label">Edit phoneNumber</label>
                         <div class="col-sm-7">
                            <input type="text" name="phoneNumberEdit" value="${data[0].phoneNumber}" class="form-control" id="phoneNumberEdit">
                          </div>  
                     </div>

                     <div class="form-group row">
                         <label for="addressEdit" class="col-sm-2 col-form-label">Edit address</label>
                         <div class="col-sm-7">
                            <input type="text" name="addressEdit" value="${data[0].address}" class="form-control" id="addressEdit">
                         </div>
                    </div>

                     <div class="form-group row">
                         <label for="emailEdit" class="col-sm-2 col-form-label">Edit email</label>
                         <div class="col-sm-7">
                            <input type="text" name="emailEdit" value="${data[0].email}" class="form-control" id="emailEdit">
                          </div>
                     </div><button id='btnUpdate' type="submit" value="submit" class="btn btn-primary">Update</button></div>
                    </form>`);
                     
                      res.write(``)
                     
                      res.write(`<script>
                   
                      var app = angular.module("app", []);
                     app.controller("ctrl", ["$scope", function($scope){
                            
                      $scope.me = false;
                      $scope.Mee = function(){
                       $scope.me = true;
                      }
                      $scope.Other = function(){
                       $scope.me = false;
                      }
                            
                     }])
                     </script>
                     <script>

                     </script>`);


                    //  ${data[0].firsetName}='Manipulated';
                      // res.end();
                    return;
                
              }
      else{
                     console.log("Match not Found");
                    //  res.write("IncorrectCredentials");
          }
         }
      }
  });

})


app.post("/delete", bodyParser.urlencoded({extended: false}))

app.post("/updatePerson", bodyParser.urlencoded({extended: false}))
app.post("/updatePerson", (req, res)=>{

  
  const fName = req.body.fNameEdit;
  const lName = req.body.lNameEdit;
  const phoneNumber = req.body.phoneNumberEdit;
  const address = req.body.addressEdit;
  const email = req.body.emailEdit
  const personToBeUpdated = req.body.PersonToBeUpdated;
  const param = req.body.PersonToBeUpdated;

  updatePersonal(fName ,lName, phoneNumber, address, email, personToBeUpdated);
  console.log(req.body);
   res.redirect("/");
  res.end();
})


app.get("/emps", (req ,res)=>{
  console.log(req.params);
})


app.get("/delete", (req,res)=>{
  fetchDataDelete(res);
  //res.end()
  
})


app.post("/delete", (req, res)=>{
  console.log(req.body.deletedPerson);
  adminDelete(req.body.deletedPerson);
  res.redirect("/delete");
  // res.end();
  
})


app.get("/updateAdmin", (req, res)=>{
  // res.sendFile(__dirname + "/updateAdmin.html");
  fetchDataUpdateAdmin(res);
  
})

app.post("/updateAdmin", bodyParser.urlencoded({extended: false}))
app.post("/updateAdmin", (req, res)=>{
    
    const empName = req.body.personToBeUpdated;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const position = req.body.position;
    const salary = req.body.salary;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const email = req.body.email;
    const password = req.body.password;

  
   console.log(req.body);
   console.log(firstName  + " " + lastName + " " + position + " " + salary + " " + phoneNumber + " " + address + " " + email + " " + password + " " +empName);
    updateAdmin(firstName, lastName, position, salary, phoneNumber, address, email, password, empName)
     res.redirect("/admin");
      res.end();
});


app.post("/adminUp", bodyParser.urlencoded({extended: false}))
app.post("/adminUp", (req, res)=>{
    
    console.log(req.body);
})


app.listen(5000, ()=>{
    console.log("Server Conncted on port 5000");
});
