const { isAuthenticated } = require('../middlewares/permissions');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const express = require("express");
const bcrypt = require('bcryptjs');

// Generate a Json web token por a given user
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES
  })
}

const router = express.Router();

// Resister an user.
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check for user with the same username. Case
  // the username already in use we return an error
  if (await User.findOne({ where: { username } })) {
    return res.status(400).json({
      message: "Não foi possível criar um usuário com esse nome"
    })
  }

  const salt = bcrypt.genSaltSync(10);
  const encoded_password = bcrypt.hashSync(password, salt);

  // Create the user and send his access token
  const user = await User.create({ username, password: encoded_password });

  const token = generateAccessToken(user);
  user.password = undefined;

  return res.json({ user, token });
});

// Authenticate an user in the system by 
// returning profile and access token
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(404).send({
      'message': 'Usuário ou senha inválida'
    });
  }

  if (! await bcrypt.compare(password, user.password)) {
    return res.status(401).send({
      'message': 'Usuário ou senha inválida'
    });
  }

  user.password = undefined;

  const token = generateAccessToken(user);
  res.send({ user, token })

});

// Return the user profile if authenticated
router.get('/profile', isAuthenticated, async (req, res) => {

  const user = await User.findOne({ where: { id: req.user.id } });

  if (!user) {
    return res.status(404).send({
      'message': 'Perfil não encontrado'
    });
  }

  user.password = undefined;
  res.status(200).json(user);

});

module.exports = app => app.use('/user', router)