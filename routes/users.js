const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// Pass function reference
router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

module.exports = router;
