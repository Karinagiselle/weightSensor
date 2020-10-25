const http = require('http');
const path = require('path');
const express = require('express');

const controller = require('./controllers/controller');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
// app.set('views', 'views');


app.use('/',controller.getArt);
    
mongoConnect( () => {
    controller.getArt();
    // controller.insert();
});
