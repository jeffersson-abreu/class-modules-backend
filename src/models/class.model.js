const database = require('../database');
const Sequelize = require('sequelize');
const Module = require('./module.model');

const Class = database.define('Class', {
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

  duration: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },

  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
},
  {
    timestamps: false
  }
);


Class.belongsTo(Module, {
  foreignKey: 'module'
})

module.exports = Class;