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
    type: Sequelize.STRING(255),
    allowNull: false
  },

  description: {
    type: Sequelize.STRING(2048),
    allowNull: false
  },

  classes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
},
  {
    timestamps: false
  }
);

module.exports = Module;