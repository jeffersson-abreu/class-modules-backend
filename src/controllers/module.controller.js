const { isAuthenticated } = require('../middlewares/permissions');
const Class = require('../models/class.model');
const Module = require('../models/module.model');
const express = require("express");

const router = express.Router();

// List all modules, do not need authentication
router.get('/', async (req, res) => {
  const modules = await Module.findAll();
  return res.json(modules);
});


// List all module classes, do not need authentication
router.get('/:module/classes', async (req, res) => {
  const { module } = req.params;

  const modules = await Class.findAll({ where: { module } });
  return res.json(modules);
});


// Resister a module if user is authenticated.
router.post('/', isAuthenticated, async (req, res) => {
  const { name } = req.body;

  // Check for a module with same name. Case
  // the module exists we return an error
  if (await Module.findOne({ where: { name } })) {
    return res.status(400).json({
      message: "Este módulo já existe"
    })
  }

  // Create the module
  const module = await Module.create({ name });
  return res.status(201).json(module);
});


// Partial update a module if user is authenticated.
router.patch('/:id', isAuthenticated, async (req, res) => {

  const { id } = req.params;

  const module = await Module.findOne({ where: { id } });

  if (!module) {
    // The module does not exists
    return res.status(404).json({
      message: "Este módulo não existe"
    })
  }

  // update the module
  Object.assign(module, req.body);
  await module.save();

  return res.status(200).json(module)
});


// Delete a module if user is authenticated.
router.delete('/:id', isAuthenticated, async (req, res) => {

  const { id } = req.params;

  const module = await Module.findOne({ where: { id } });

  if (!module) {
    // The module does not exists
    return res.status(404).json({
      message: "Este módulo não existe"
    })
  }

  // remove the module
  await module.destroy();
  return res.status(204).send()
});

module.exports = app => app.use('/modules', router)