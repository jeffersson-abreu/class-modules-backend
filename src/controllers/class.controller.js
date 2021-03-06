const { isAuthenticated } = require('../middlewares/permissions');
const Module = require('../models/module.model');
const Class = require('../models/class.model');
const express = require("express");

const router = express.Router();


// List all classes, do not need authentication
router.get('/', async (req, res) => {
  const modules = await Class.findAll({
    order: [['name', 'ASC']]
  });
  return res.json(modules);
});


// Resister a class if user is authenticated.
router.post('/', isAuthenticated, async (req, res) => {
  const { name, module } = req.body;

  // Check if the module really exists
  const _module = await Module.findOne({ where: { id: module } });

  if (!_module) {
    return res.status(400).json({
      message: "Módulo desconhecido"
    })
  }

  // Check for a class with same name. Case
  // the class exists we return an error
  if (await Class.findOne({ where: { name } })) {
    return res.status(400).json({
      message: "Esta aula já existe"
    })
  }

  // Create the class
  const _class = await Class.create(req.body);

  // Increase class count
  _module.classes += 1
  await _module.save();

  return res.status(201).json(_class);
});


// Partial update a class if user is authenticated.
router.patch('/:id', isAuthenticated, async (req, res) => {

  const { id } = req.params;
  const { module } = req.body;

  // Check if the module really exists
  const _module = await Module.findOne({ where: { id: module } });

  if (!_module) {
    return res.status(400).json({
      message: "Módulo desconhecido"
    })
  }

  const _class = await Class.findOne({ where: { id } });

  if (!_class) {
    // The class does not exists
    return res.status(404).json({
      message: "Esta aula não existe"
    })
  }

  // update the class
  Object.assign(_class, req.body);
  await _class.save();

  return res.status(200).json(_class)
});


// Delete a class if user is authenticated.
router.delete('/:id', isAuthenticated, async (req, res) => {

  const { id } = req.params;

  const _class = await Class.findOne({ where: { id } });

  if (!_class) {
    // The class does not exists
    return res.status(404).json({
      message: "Esta aula não existe"
    })
  }

  // Decrease module class counter
  const module = await Module.findOne({ where: { id: _class.module } });
  module.classes -= 1;
  await module.save();

  // remove the module
  await _class.destroy();
  return res.status(204).send()
});

module.exports = app => app.use('/class', router)