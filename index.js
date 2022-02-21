const controllers = require('./src/controllers');
const database = require('./src/database');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')

const app = express();

app.use((req, res, next) => {
  // Allow only ower front-end make requests in database. 
  // All methods supported are also listed listed
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", 'GET,PATCH,POST,DELETE');
  app.use(cors());
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Initialize all controllers
controllers(app);

// Database sync
database.sync();

app.listen(8000)
