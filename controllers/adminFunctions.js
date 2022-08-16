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




function fetchDataAdmin(response){
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
                  
                <script>
                 $(function(){
                $('#nav').load("header.html");
                });
                </script>
                <style>
                .homePage{
                    width: 50%;
                }
                .homePage{
                  width: 50%;
                }
                body {
                 
                  background: #fff8dc;
                 }
              .myProfile,
              .otherEmps{
                border: 0px solid white;
              }
              table, th, td {
                border: 29px solid yellow ;
              }
              .logo{
                text-indent: -99px;
                background: url('dengeneLogo.png');
                width: 50px;
                height:70px;
                background: yellow;
               }
               input{
                width:10%;
                margin: 8px;
                border: 2px solid red;
                border-radius: 4px;
            }

               .header{
                  display: flex;
                  background: rgb(141, 176, 78); 
                  padding: 16px;
                  align-items: stretch;
               }
                nav{

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
                    <a class="navbar-brand"  href="#"><strong>Dengene Employees Management System</strong></a>
                    </nav>
          
                    </div>`);
                   response.write(`<table  class="table table-bordered table-hover"><thead thead-dark><tr>`)
                   
                    for(var column in result[0]){
                       
                        response.write(`<th scope="col">` + column + `</th>`);
                      
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
                   
                    response.end();
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
        background-image: url("serviceNow.jpg");
        background-size: cover;
      }
       
                   
      </style>
       </head>
       <body ng-app="app2" ng-controller="ctrl2">
    
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
                             <label for="lNameEdit" class="form-label" style="font-weight: bold; font-size: 1.3em;">Enter The Employee Name or Click on the Employees</label>
                             <input type="text" name="deletedPerson" class="form-control" id="deletedPerson">
                      </div><button style="background: red;" id='btnUpdate' type="submit" value="delete" class="btn btn-primary">Delete</button></form>`);
                      
          for(var i = 0; i< result.length; i++){
    
            response.write(`<h3 ng-click="deleteEmp('${result[i].firsetName}')">` +result[i].firsetName + `</h3>`)
            // console.log(result);
        }
        response.write(`<script>
                var deletedPerson = document.getElementById("deletedPerson");
                  
                var app = angular.module("app2", []);
                app.controller("ctrl2", ["$scope", function($scope){
                       $scope.deleteEmp = function(name){
                         deletedPerson.value = name;
                       }

                }])
        </script>`);
        response.end();
  
      }
    })  
  
  }
  

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


function updateAdmin(upFirstName, upLastName, upPosition, upSalary, upPhoneNumber, upAddress, upEmail, upPassword, personToBeUpdated ){
    let myySql = `UPDATE dengene
    SET firsetName = ?, lastName = ?, position = ?, salary = ?, phoneNumber = ?, address = ?, password = ?, email = ?
    WHERE firsetName = ?`;

    let myyVal = [upFirstName, upLastName, upPosition , upSalary, upPhoneNumber, upAddress, upPassword, upEmail, personToBeUpdated];


    connection.query(myySql, myyVal,(err, data)=>{

      if(err){
          console.log("Error From Trying to update Record ");
          
      } 
      else{
        console.log("Record Succesfully updated by Admin");
        console.log(data);
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
            body{
              background: #fff8dc;
            }
            </style>
             </head>
             <body ng-app="app2" ng-controller="ctrl2">
    
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
                
         response.write(`<div style="width: fit-content; display:flex; flex-wrap: wrap; gap: 15px" class="formContainer">`);
              for(var people in result){
                    
                    // response.write(`<h3 ng-click=${result[people].firsetName}>${result[people].firsetName}</h3>`);
                    
                    response.write(`<div ng-show="true"><strong>${result[people].firsetName} ${result[people].lastName}</strong><form style="  box-shadow: 0 4px 8px 0 #323232, 0 6px 20px 0 #323232;
                    text-align: center;" action="/updateAdmin" method="post">
                
  
                    <label ng-show="false" for="personToBeUpdated" class="form">Enter User To Be Updated</label>
                    <input ng-show="false" type="text" name="personToBeUpdated" value=${result[people].firsetName} id="firstNameOriginal"><br>
                  
                 
                    <input type="text" name="firstName" value=${result[people].firsetName} id="firstName"><br>
               
      
                    <input type="text" name="lastName" value=${result[people].lastName} id="lastName"><br>
              
      
                   
                    <input type="text" name="position" value=${result[people].position} id="position"><br>
                
  
                  
                    <input type="number" name="salary" value=${result[people].salary} id="salary"><br>
          
                    
                    
                    <input type="number" name="phoneNumber" value=${result[people].phoneNumber} id="phoneNumber"><br>
              
                  
                   
                    <input type="text" name="address" value=${result[people].address} id="address"><br>
                    
                 
                    <input type="email" name="email" value=${result[people].email} id="email"><br>
                     
  
                  
                    <input type="password" name="password" value=${result[people].password} id="password"><br>
              
                    <button style="background: #323232" type="submit" ng-click=""  class="btn btn-primary" value="submit">Update</button><br>
   
                      
                    </form>`)
                    
                    response.write(`<br>`)
                    response.write(``)
                    response.write(`</div>`)  
                   
                }
            response.write(`</div>`);
       
                response.write(`<script>
                
                var deletedPerson = document.getElementById("deletedPerson");
                

                var app = angular.module("app2", []);
                app.controller("ctrl2", ["$scope", function($scope){

                
                   
  
                  $scope.deleteEmployee = function(name){
                    $scope.niggaToBeDeleted = true;
                    deletedPerson.value = name;
                    

                    // alert(name);
                    // $scope.name = name;
                  }



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
                }])
                
                
                </script>`);
  
                response.write(`</body></html>`);
               
                response.end(`</table>`);
    }
  })
  
  }
  

module.exports = {
    fetchDataAdmin, 
    fetchDataDelete,
    adminDelete,
    updateAdmin,
    fetchDataUpdateAdmin,
}