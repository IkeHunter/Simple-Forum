const express = require('express');
const app = express();
const controller = require('./controllers/controller');
const myDatabase = require('./db');
const mysql=require('mysql');

app.set('view engine', 'ejs');

app.use(express.static('./public'));

controller(app, myDatabase(mysql));

app.listen(3000);
console.log('You are listening to port 3000');