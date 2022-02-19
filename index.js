const controllers = require('./src/controllers');
const database = require('./src/database');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Initialize all controllers
controllers(app);

// Database sync
database.sync();

app.listen(3000)