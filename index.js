const controllers = require('./src/controllers');
const database = require('./src/database');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')

const app = express();

app.use((req, res, next) => {
  // All methods supported are listed bellow
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  app.use(cors());
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Initialize all controllers
controllers(app);

// Database sync
database.sync()
  .catch(() => {
    console.log("Database connection error");
    console.log("Make sure database is running");
    process.exit(1);
  });

app.listen(8000, 'localhost')
