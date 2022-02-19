const Sequelize = require('sequelize');
const database = require('../database');


const Module = database.define('Module', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
},
  {
    timestamps: false
  }
);

module.exports = Module;