const dotenv = require('dotenv');
dotenv.config();

// recall mongo client
const MongoClient = require('mongodb').MongoClient;

// declare a variable for the database
let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        database = client.db(); // store database reference directly
        callback(null, database);
    })
    .catch((err) => {
        callback(err);
    });
};

// Another to see if it is initialized
const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};

// Now export
module.exports = {
    initDb,
    getDatabase
};
