const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// Get all users
router.get('/', usersController.getAll);

// Get single user by ID
router.get('/:id', usersController.getSingle);

// Create new user
router.post('/', usersController.createUser);

// Update user
router.put('/:id', usersController.updateUser);

// Delete user
router.delete('/:id', usersController.deleteUser);

module.exports = router;
