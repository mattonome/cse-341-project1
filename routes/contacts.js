const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts'); // updated

// Get all contacts
router.get('/', contactsController.getAll);

// Get a contact by ID
router.get('/:id', contactsController.getSingle);

// Create a new contact
router.post('/', contactsController.createContact);

// Update a contact
router.put('/:id', contactsController.updateContact);

// Delete a contact
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
