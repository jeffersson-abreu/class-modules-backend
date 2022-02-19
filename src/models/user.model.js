const Sequelize = require('sequelize');
const database = require('../database');


const User = database.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
},
  {
    timestamps: false
  }
);

module.exports = User;