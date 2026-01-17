const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all contacts
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .collection('contacts') // use correct collection
      .find();

    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts', error: err });
  }
};

// Get a single contact by ID
const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .collection('contacts')
      .findOne({ _id: contactId });

    if (!result) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contact', error: err });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDatabase()
      .collection('contacts')
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'Some error occurred while creating the contact.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating contact', error: err });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDatabase()
      .collection('contacts')
      .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while updating the contact.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating contact', error: err });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while deleting the contact.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact', error: err });
  }
};

// Export controller functions
module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
