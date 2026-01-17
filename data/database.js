const dotenv = require('dotenv');
dotenv.config();

// recall mongo client
const { MongoClient } = require('mongodb');

// declare a variable for the database
let database;

const initDb = (callback) => {
  if (database) {
    console.log('Db is already initialized!');
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      // FIX: explicitly select database
      database = client.db(process.env.DB_NAME || 'contactsDB');
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

// Check if DB is initialized
const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

// export
module.exports = {
  initDb,
  getDatabase
};
