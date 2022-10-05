const express = require("express");
const path = require("path");
const port = 3000;
const bodyParser = require("body-parser");
const CRUD_operations = require("./CRUD_functions");

const app = express();

app.use(express.static(path.join(__dirname,'static')));
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true
}));

app.get('/',(req,res)=>
{
  res.redirect('/home_page');
});

app.get('/home_page',(req,res)=>
{
    //res.sendFile(path.join(__dirname,'view/home_page.html'));
    res.render('home_page');
}
);

app.get('/log_in',(req,res)=>
{
    //res.sendFile(path.join(__dirname,'view/log_in.html'));
    res.render('log_in');

});

app.get('/sign_up',(req,res)=>
{
    //res.sendFile(path.join(__dirname,'view/sign_up.html'))
    res.render('sign_up');
});

app.get('/my_profile',(req,res)=>
{
    //res.sendFile(path.join(__dirname,'view/sign_up.html'))
    res.render('my_profile');
});

app.listen(port, ()=>
{
    console.log('this is the port you are on' + port)
});

app.post('/newUser' ,CRUD_operations.create_new_user);
app.post("/Check_login", CRUD_operations.Login);