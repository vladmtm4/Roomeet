const sql = require('./db');
const express =  require('express');
const path = require("path");
const app = express();
var session;
const cookieParser = require("cookie-parser");
let alert = require('alert'); 

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware


// cookie parser middleware
app.use(cookieParser());

const create_new_user = (req ,res) =>
{
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!" + req.body
        });
        return;
    }
    const newUser = 
    [{
        "email" : req.body.email ,
        "name" : req.body.Full_Name,
        "password" : req.body.Password,
        "age" : req.body.age,
        "gender" :req.body.gender,
        "ocupation":req.body.ocupation,
        "pets" :req.body.pets,
        "religion":req.body.religion,
        "kitchen":req.body.kitchen,
        "phone":req.body.phone,
        "about":req.body.comment
    }];

    sql.query("INSERT INTO Users SET ?", newUser[0] , (err,mysqlres) => 
    {
        if (err) {
            console.log ("err is " + err);
            res.status(400).send({message: "error in creating User: " + err});
            return;
        }
        console.log("new User created successfully");
        console.log(newUser);
        res.append('Set-Cookie', 'UserEmail='+newUser[0].email+'; Path = /; HttpOnly');
        res.render('my_profile', {
            loged_in_user: newUser
        });        return;
    });
        
};


const Login = (req, res)=>{
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"});
        return;
    }
    const LoginInfo = {
        
        "email": req.body.Email,
        "Password": req.body.Password
        
    };
    console.log(LoginInfo.Password);
    console.log(LoginInfo.email);
    sql.query("SELECT * FROM Users where email=? and password=?",[LoginInfo.email,LoginInfo.Password], (err, mysqlres)=>{
 
        if (err) throw err;
        if (mysqlres.length > 0) 
        {
            //res.redirect('/my_profile');
            console.log("You are logged in the user")
            res.append('Set-Cookie', 'UserEmail='+LoginInfo.email+'; Path = /; HttpOnly');
            res.render('my_profile', {
                loged_in_user: mysqlres
            });
        }
       
        else 
        {

            alert('Incorrect Username and/or Password!!')
            res.redirect('/log_in');

        }			
 
    })}; 




const get_user_data_session = (req,res) =>
{
    let email = GetUser(req,res);
        sql.query("SELECT * FROM Users where email=? ",email, (err, mysqlres)=>
        {
            if(err)
            {
                console.log(err);
            }
            res.render('my_profile',{
                loged_in_user:mysqlres
        });
    });    
};


function GetUser(req,res){
    if (req.get("Cookie"))
    {
       var session = req.get("Cookie");
       console.log("Session is +"+session)
       var splitSession = session.split(/=|;/);
       var email = splitSession[1];
       return email;
   }};




const update_user = (req ,res) =>
   {
       if (!req.body) {
           res.status(400).send({
           message: "Content can not be empty!" + req.body
           });
           return;
       }
       const updated_data = 
       {
           "email": req.body.email,
           "name" : req.body.Full_Name,
           "phone":req.body.phone,
       };
       console.log(updated_data);
       let logged_email = GetUser(req,res);
       sql.query("UPDATE Users SET name=?,phone=? WHERE email=? ", 
       [updated_data.name,updated_data.phone,logged_email], (err,mysqlres) => 
       {
           if (err) {
               console.log ("err is " + err);
               res.status(400).send({message: "error in creating User: " + err});
               return;
           }
           console.log("User updated");
       });
       sql.query("SELECT * FROM Users where email=? ",updated_data.email, (err, mysqlres2)=>
       {
           if(err)
           {
               console.log(err);
           }
           console.log(mysqlres2);
           res.render('my_profile',{
               loged_in_user:mysqlres2
       });
    });  
           
   };

const update_user_preference = (req ,res) =>
   {
       if (!req.body) {
           res.status(400).send({
           message: "Content can not be empty!" + req.body
           });
           return;
       }
       const updated_data = 
       {
           "email": req.body.email,
           "ocupation":req.body.ocupation,
           "pets" :req.body.pets,
           "religion":req.body.religion,
           "kitchen":req.body.kitchen,
       };
       console.log(updated_data);
       let logged_email = GetUser(req,res);
       sql.query("UPDATE Users SET ocupation=?,pets=?,religion=?,kitchen=? WHERE email=? ", 
       [updated_data.ocupation,updated_data.pets,
       updated_data.religion,updated_data.kitchen,logged_email], (err,mysqlres) => 
       {
           if (err) {
               console.log ("err is " + err);
               res.status(400).send({message: "error in creating User: " + err});
               return;
           }
           console.log("User updated");
       });
       sql.query("SELECT * FROM Users where email=? ",logged_email, (err, mysqlres2)=>
       {
           if(err)
           {
               console.log(err);
           }
           console.log(mysqlres2);
           res.render('my_profile',{
               loged_in_user:mysqlres2
       });
    });  
           
   };   

   const get_users_table = (req,res)=>{
    var Query3 = "SELECT * FROM Users";
    sql.query(Query3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing users table ", err);
            res.send("error in showing users table ");
            return;
        }
        console.log("showing users table");
        res.render('meet_roomate',{
            filtered_users:mySQLres
        })
        return;
    })
};


const get_users_table_filtered = (req,res)=>{
    const QueryFilter = {
        "ocupation": req.body.ocupation,
        "pets": req.body.pets,
        "religion": req.body.religion,
        "kitchen": req.body.kitchen,
    };
    if(!QueryFilter.ocupation&&!QueryFilter.kitchen&&!QueryFilter.pets&&!QueryFilter.religion)
    {
        var filtered_query = "SELECT * FROM Users";

    }
    filtered_query = "SELECT * FROM Users WHERE ocupation= IF(? IS NULL, ocupation, ?) and pets= IF(? IS NULL, pets, ?) and religion= IF(? IS NULL, religion, ?) and kitchen= IF(? IS NULL, kitchen, ?) "
    sql.query(filtered_query,[QueryFilter.ocupation,QueryFilter.ocupation,QueryFilter.pets,QueryFilter.pets,QueryFilter.religion,QueryFilter.religion,QueryFilter.kitchen,QueryFilter.kitchen], (err, mySQLres)=>{
        if (err) {
            console.log("error in showing users table ", err);
            res.send("error in showing users table ");
            return;
        }
        console.log("showing users table");
        res.render('meet_roomate',{
            filtered_users:mySQLres
        })
        return;
    })
};

module.exports = {create_new_user,Login,get_user_data_session,update_user,update_user_preference,get_users_table,get_users_table_filtered};