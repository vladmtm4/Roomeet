var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');

//create tables
const CreateUsersTable = (req,res)=> {
    var Query1 = "CREATE TABLE Users (email varchar(255) NOT NULL,name varchar(255) NOT NULL, password varchar(255) NOT NULL, age int(8) NOT NULL, gender varchar(255) NOT NULL, ocupation varchar(255) NOT NULL, pets varchar(255) NOT NULL, religion varchar(255) NOT NULL, kitchen varchar(255) NOT NULL,phone int(20) NOT NULL, about varchar(255),PRIMARY KEY (`email`))";
    SQL.query(Query1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating users table"});
            return;
        }
        console.log('created users table');
        res.send("users table created");
        return;
    })      
}


//drop
const DropUsersTable = (req, res)=>{
    var Query2 = "DROP TABLE Users";
    SQL.query(Query2, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping users table ", err);
            res.status(400).send({message: "error on dropping users table" + err});
            return;
        }
        console.log("users table drpped");
        res.send("users table drpped");
        return;
    })
};



//show
const ShowUsersTable = (req,res)=>{
    var Query3 = "SELECT * FROM Users";
    SQL.query(Query3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing users table ", err);
            res.send("error in showing users table ");
            return;
        }
        console.log("showing users table");
        res.send(mySQLres);
        return;
    })
};
	
//insert
const InsertDataToUsers = (req,res)=>{
    var Query4 = "INSERT INTO Users SET ?";
    const csvFilePath= path.join(__dirname, "usersData.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewUser = {
            "email": element.email,
            "name": element.name,
            "password": element.password,
            "age": element.age,
            "gender": element.gender,
            "ocupation": element.ocupation,
            "pets": element.pets,
            "religion": element.religion,
            "kitchen": element.kitchen,
            "phone": element.phone,
            "about": element.about
        }
        if(NewUser.email!='')
        {
            console.log(NewUser);
            SQL.query(Query4, NewUser, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting data into users table", err);
                }
                console.log("created row sucssefuly in users table");
            });
        }

    });
    })
    res.send("data read in users table");
};

module.exports = {CreateUsersTable,DropUsersTable,ShowUsersTable,InsertDataToUsers};