const mysql = require('mysql2');
const dbConfig = require('./db.config');


// conection

const conection = mysql.createConnection(
    {
        host : dbConfig.HOST,
        user : dbConfig.USER,
        password : dbConfig.PASSWORD,
        database : dbConfig.DB
    }
);

//open connection

conection.connect(err => 
    {
        if(err) throw err;
        console.log("you have loged in successfully ");
    });

module.exports = conection;    