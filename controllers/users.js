const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all users
const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().collection('users').find();
  const users = await result.toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(users);
};

// Get a single user by ID
const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().collection('users').findOne({ _id: userId });
  if (!result) res.status(404).json({ message: 'User not found' });
  else res.status(200).json(result);
};

// Create user
const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birth: req.body.birthday,
  };
  const response = await mongodb.getDatabase().collection('users').insertOne(user);
  if (response.acknowledged) res.status(201).json(response);
  else res.status(500).json('Some error occurred while creating the user.');
};

// Update user
const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birth: req.body.birthday,
  };
  const response = await mongodb.getDatabase().collection('users').replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) res.status(204).send();
  else res.status(500).json('Some error occurred while updating the user.');
};

// Delete user
const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().collection('users').deleteOne({ _id: userId });
  if (response.deletedCount > 0) res.status(204).send();
  else res.status(500).json('Some error occurred while deleting the user.');
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
