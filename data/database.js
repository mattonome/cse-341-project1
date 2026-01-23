const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Db is already initialized!');
    return callback(null, database);
  }

  mongoose
    .connect(process.env.MONGODB_URL)
    .then((connection) => {
      database = connection;
      console.log('MongoDB connected using Mongoose');
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase
};
