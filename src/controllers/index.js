const path = require('path');
const fs = require('fs');

// Search for every files inside controllers except
// files that starts with "." and this file "index.js"
// For each file found in controllers pass app as parameter
const controllers = app => {
  fs
    .readdirSync(__dirname)
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== 'index.js')))
    .forEach(file => require(path.resolve(__dirname, file))(app));
};

module.exports = controllers;