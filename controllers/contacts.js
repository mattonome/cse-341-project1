const Contact = require('../models/contact');
const mongoose = require('mongoose');

// Get all contacts
const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts', error: err.message });
  }
};

// Get a single contact
const getSingle = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contact', error: err.message });
  }
};

// Create contact
const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const result = await contact.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: 'Validation error', error: err.message });
  }
};

// Update contact
const updateContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: 'Error updating contact', error: err.message });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact', error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
