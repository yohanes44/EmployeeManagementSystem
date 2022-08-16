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


    // "SELECT `id`, `firsetName`, `lastName`, `position`, `salary`, `phoneNumber`, `address`, `role`, `email`FROM `dengene`"

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




function displayforUsers(user){



}



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
                        
                if(data[0].role == "admin"){//send to admin page
                  // console.log(data[0].firsetName);
                  const userName = data[0].firsetName;
                  console.log("ADMIN LOGGED IN");
                  // console.log(data[0].role);
                  // res.sendFile(__dirname + "/admin3.html")
                  //console.log(res);
                  // fetchData(res);
                  res.redirect('/admin');
                 return res.end();
                }

                if(data[0].role == "user"){//send to user page
                      // console.log(data[0].firsetName);
                      // displayforUsers(data[0].firsetName);
                      var sortedArray = data.filter((dat)=>{dat.email == myEm} );
                      console.log("Sorted Array");
                      console.log(data[0]);
                      userInfo = data[0];
                      usersViewOtherEmps(res);
                     
                      // console.log(editedFirstName);
                      // console.log(req.body);
                      // res.json(data[0]);
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
                          </style>
                        </head>
                        <body ng-app="app" ng-controller="ctrl">
      
                        <div id="nav"></div>
                        <!-- 
                       remove header
      
                        below
                        remove header -->
      
                          <div>
                          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                          <div class="container-fluid">
                          <a class="navbar-brand" href="#">Dengene</a>
                          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                          </button>
                          <div class="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link" href="/home">Home</a>
                      </li>
                      <li class="nav-item">
                      <a class="nav-link" href="/home">Home</a>
                      </li>
                       </ul>
                       </div>
                       </div>
                        <a class="navbar-brand" href="#">Dengene Employees Management System</a>
                        </nav>
        
                  </div>`);
                   
                      res.write(`<table ng-show="me" class="table"><thead><tr><th scope="col">First Name</th><th scope="col">Last Name</th><th scope="col">Position</th><th scope="col">Salary</th><th scope="col">Phone Number</th><th scope="col">address</tr></thead>`);
                      res.write(`<tbody><tr><td>${data[0].firsetName}</td><td>${data[0].lastName}</td><td>${data[0].position}</td><td>${data[0].salary}</td><td>${data[0].phoneNumber}</td><td>${data[0].address}</td></tr></tbody>`);
                     

                      res.write(`<button ng-click="Mee()">Mee</button><button ng-click="Other()">Other</button>`)     


              
                      res.write(`</table>`)
//Update Users Data
                       res.write(`<div ng-show="me">
                   <form action="/updatePerson" method="post" id="form">
                     
                   <div class="mb-2">
                     <input type="text" name="PersonToBeUpdated" class="form-control" value="${data[0].firsetName}" id="PersonToBeUpdated">
                   </div>
                    
                     <div class="mb-2" >
                       <label for="fNameEdit" class="form-label">Edit FirstName</label>
                       <input type="text" name="fNameEdit" class="form-control" id="fNameEdit">
                     </div>
                     <div class="mb-1">
                         <label for="lNameEdit" class="form-label">Edit lastName</label>
                         <input type="text" name="lNameEdit" class="form-control" id="lNameEdit">
                     </div>
                     <div class="mb-1">
                         <label for="phoneNumberEdit" class="form-label">Edit phoneNumber</label>
                         <input type="text" name="phoneNumberEdit" class="form-control" id="phoneNumberEdit">
                     </div>
                     <div class="mb-1">
                         <label for="addressEdit" class="form-label">Edit address</label>
                         <input type="text" name="addressEdit" class="form-control" id="addressEdit">
                     </div>
                     <div class="mb-1">
                         <label for="emailEdit" class="form-label">Edit email</label>
                         <input type="text" name="emailEdit" class="form-control" id="emailEdit">
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
  // res.redirect("/");
  res.end();
})





app.get("/emps", (req ,res)=>{
  console.log(req.params);
})






 
function usersViewOtherEmps(response){
  connection.query("SELECT `id`, `firsetName`, `lastName`, `position`, `salary`, `phoneNumber`, `address`, `role`, `email`FROM `dengene`", (error, result)=>{
      if(error){
          console.log("Error fetching data");
      }
      else{
       
                 response.write(`<table ng-hide="me" class="table"><thead><tr>`)
                  for(var column in result[0]){
                      response.write(`<th scope="col">` + column + `</th>`);
                     
                  }
                  response.write(`<tr></thead>`)
                  for(var row in result){
                      response.write(`<tr>`)
                      for(var column in result[row]){
                          response.write(`<td><label>` + result[row][column] + '<button>Edit</button> +'`</label></td>`)
                      }
                      response.write(`</tr>`)
                  }
                  response.write(`</table>`);
                  response.end();
      }
  })

  // myCallBack();

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



function fetchDataAdmin(response){
  connection.query("SELECT * FROM dengene", (error, result)=>{
      if(error){
          console.log("Error fetching data");
      }
      else{
          // console.log(result);
          // console.log(result);
              response.write(`<!DOCTYPE html>
              <html lang="en">
              <head>
               <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Admin Page</title>
          
               <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
               <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
                
              <script>
               $(function(){
              $('#nav').load("header.html");
              });
              </script>
              <style>
              .homePage{
                  width: 50%;
              }
              </style>
               </head>
               <body ng-app="app" ng-controller="ctrl">
      
             <div id="nav"></div>
              <!-- 
               remove header -->
      
               <div>
               <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <div class="container-fluid">
                <a class="navbar-brand" href="#">Dengene</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link" href="/adminHome">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/admin">My Page</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/delete">delete</a>
                  </li>
                  <li class="nav-item">
                  <a class="nav-link" href="/adminRegister">Register</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/updateAdmin">Update Employees</a>
              </li>
              
                   
                  </ul>
                  </div>
                  </div>
                  <a class="navbar-brand" href="#">Dengene Employees Management System</a>
                  </nav>
        
                  </div>`);
                 response.write(`<table  class="table"><thead><tr>`)
                 
                  for(var column in result[0]){
                     
                      response.write(`<th scope="col">` + column + `</th>`);
                      // console.log(result);
                      // response.write(`</tr>`);
                  }
                  response.write(`<tr></thead>`)
                  for(var row in result){
                    
                      response.write(`<tr>`)
                      for(var column in result[row]){
                          response.write(`<td><label>` + result[row][column] +  `</label></td>`);
                      }
                      response.write(`</tr>`)
                  }
              
                  response.write(`</body></html>`);
                 
                  response.end(`</table>`);
      }
  })
}



function fetchDataDelete(response){

  connection.query("SELECT firsetName FROM dengene", (error, result)=>{
    if(error){
        console.log("Error fetching data");
    }
    else{
          // console.log(result);
          // fetchDataDelete(result);
          console.log(result[0].firsetName);


    


          response.write(`<!DOCTYPE html>
          <html lang="en">
          <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Admin Page</title>
  
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
  
  
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
  
        <script>
        $(function(){
        $('#nav').load("header.html");
        });
    </script>
    <style>
    .homePage{
        width: 50%;
    }
    </style>
     </head>
     <body>
  
   <div id="nav"></div>
    <!-- 
     remove header -->
  
     <div>
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Dengene</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <a class="nav-link" href="/adminHome">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/admin">My Page</a>
      </li>
      <li class="nav-item">
      <a class="nav-link" href="/delete">delete</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="/adminRegister">Register</a>
  </li>
  <li class="nav-item">
  <a class="nav-link" href="/updateAdmin">Update Employees</a>
</li>

         
        </ul>
        </div>
        </div>
        <a class="navbar-brand" href="#">Dengene Employees Management System</a>
        </nav>
  
        </div>`);

        //  <form action="/emps" method="GET" id="form">
                    response.write(`<form action="/delete" method="post" id="form">
                    <div class="mb-1">
                           <label for="lNameEdit" class="form-label">Who You Want to Delete</label>
                           <input type="text" name="deletedPerson" class="form-control" id="name="deletedPerson">
                    </div><button id='btnUpdate' type="submit" value="delete" class="btn btn-primary">Delete</button></form>`);
  
        for(var i = 0; i< result.length; i++){
  
          response.write(`<h1>` +result[i].firsetName  + `</h1>`)
          // console.log(result);
      }
      response.end();
  
   

    }
  })

     

}




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

function adminDelete(deleteValueFirstName){
    var sql = `DELETE FROM dengene WHERE firsetName = ?`;
    var val = [deleteValueFirstName]
    connection.query(sql, val, (error, results, fields) => {
        if (error){
            return console.error(error.message);
        }
        else{
            console.log('Deleted Row(s):', results.affectedRows);
            console.log('Deleted Succesfully');
            return;
        }
    });
}


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
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const email = req.body.email;

   console.log(req.body);

    updateAdmin(firstName, lastName, position, phoneNumber, address, email, empName)
     res.redirect("/updateAdmin");

});


function updateAdmin(upFirstName, upLastName, upPosition, upPhoneNumber, upAddress, upEmail, personToBeUpdated ){
    let myySql = `UPDATE dengene
    SET firsetName = ?, lastName = ?, position = ?, phoneNumber = ?, address = ?, email = ?
    WHERE firsetName = ?`;

    let myyVal = [upFirstName, upLastName, upPosition ,upPhoneNumber, upAddress, upEmail, personToBeUpdated];


    connection.query(myySql, myyVal,(err, data)=>{

      if(err){
          console.log("Error From Trying to update Record ");
          
      } 
      else{
        console.log("Record Succesfully updated by Admin");  
      }
});

}


function fetchDataUpdateAdmin(response){

  connection.query("SELECT * FROM dengene", (error, result)=>{
  if(error){
      console.log("Error fetching data");
  }
  else{
  
          response.write(`<!DOCTYPE html>
          <html lang="en">
          <head>
           <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Admin Page</title>
      
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
          </style>
           </head>
           <body ng-app="app" ng-controller="ctrl">
  
         <div id="nav"></div>
          <!-- 
           remove header -->
  
           <div>
           <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Dengene</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="/adminHome">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/admin">My Page</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/delete">delete</a>
              </li>
              <li class="nav-item">
              <a class="nav-link" href="/adminRegister">Register</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="/updateAdmin">Update Employees</a>
          </li>
          
               
              </ul>
              </div>
              </div>
              <a class="navbar-brand" href="#">Dengene Employees Management System</a>
              </nav>
    
              </div>`);
              response.write(`<form ng-show="form" action="/updateAdmin" method="post" > 
        
              <label for="personToBeUpdated" class="form">Enter User To Be Updated</label>
              <input type="text" name="personToBeUpdated" id="firstNameOriginal"><br>
            

              <label for="firstName" class="form">First Name</label>
              <input type="text" name="firstName"  id="firstName"><br>
         

              <label for="lastName" class="form">Last Name</label>
              <input type="text" name="lastName" id="lastName"><br>
        

              <label for="position" class="form">Position</label>
              <input type="text" name="position" id="position"><br>
          

              <label for="phoneNumber" class="form">Phone Number</label>
              <input type="number" name="phoneNumber"  id="phoneNumber"><br>
        
            
              <label for="address" class="form">Adress</label>
              <input type="text" name="address"  id="address"><br>
       

              <label for="email" class="form">Email address</label>
              <input type="email" name="email" id="email">
        
         
              <button type="submit" ng-click="" class="btn btn-primary" value="submit">Update</button>
              
              </form>`)
             response.write(`<table  class="table"><thead><tr>`)
             
              for(var column in result[0]){
                  
                  response.write(`<th scope="col">` + column + `</th>`);
               
              }
             
              response.write(`<tr></thead>`)

   function findUpdatePerson(man){
         var mySql = "SELECT `firsetName`, `lastName`, `position`, `phoneNumber`, `address`, `email`FROM `dengene` where firsetName = ?"
         var myVal = [man];
                
        connection.query(mySql, myVal, (error, data)=>{
        if(error){
          throw error
        } 
            else{
               console.log("Update for single man Done by updateAdmin Page")
                
               return{      
                             firstName: data[0].lastName,
                             lastName: data[0].lastName,
                             position: data[0].position,
                             phoneNumber: data[0].phoneNumber,
                             address: data[0].address,
                             email: data[0].email
                            };
               }
       })
   }


                const store = [];
              for(var row in result){
                 
                  response.write(`<tr>`)
                  for(var column in result[row]){

                   
                      response.write(`<td><label ng-click="showForm('${result[row][column]}')">` + result[row][column] + `</label></td>`)

                   
                  }
                 
               
                  response.write(`</tr>`)
              }
             
                                                     
        
              // console.log(result);
              // response.write(`<table><thead><tr>`);
              // response.write(`<td>First Name</td><td>Last Name</td><td>Position</td><td>Phone Number</td><td>Address</td><td>Email</td>`)
              // response.write(`</tr></thead>`);

              // response.write(`<tbody><tr>`)
              // for(var people in result){
                  
              //     response.write(`<td>${result[people].firsetName}</td>`);
              //     response.write(`<input type="text" value=${result[people].firsetName}>`);
  
              // }
              // response.write(`</tr></tbody></table>`);







          // findUpdatePerson(result[0].firsetName);

     
              response.write(`<script>
              var firstNameOriginal = document.getElementById("firstNameOriginal"); 
              var firstName = document.getElementById("firstName");
              var lastName  = document.getElementById("lastName");
              var position = document.getElementById("position");
              var phoneNumber = document.getElementById("phoneNumber");
              var address = document.getElementById("address");
              var email = document.getElementById("email");

              var app = angular.module("app", []);
              app.controller("ctrl", ["$scope", function($scope){
                $scope.form = false;  
                $scope.personUpdates;
                $scope.showForm = function(name){
                  $scope.form = true;
                  $scope.personUpdates = name;
                  firstNameOriginal.value = name;
                  // findUpdatePerson(man);
                  findUpdatePerson(name);
                }
                $scope.hideForm = function(){
                  $scope.form = false; 
                } 
              }])</script>`);

              response.write(`</body></html>`);
             
              response.end(`</table>`);
  }
})

}
app.post("/adminUp", bodyParser.urlencoded({extended: false}))

app.post("/adminUp", (req, res)=>{
    
    console.log(req.body);
})


app.listen(5000, ()=>{
    console.log("Server Conncted on port 5000");
});
