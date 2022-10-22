const sql = require('./db');
const express =  require('express');
const path = require("path");
const app = express();
var session;
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
let alert = require('alert'); 

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

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
        //res.sendFile(path.join(__dirname,"view/my_profile.html"));
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
            console.log(mysqlres);
            //res.redirect('/my_profile');
            console.log("You are logged in")
            session=req.session;
            console.log(req.session)
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

module.exports = {create_new_user,Login};