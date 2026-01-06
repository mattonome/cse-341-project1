const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    // get the users collection
    const result = await mongodb.getDatabase().collection('users').find();
    const users = await result.toArray(); // convert cursor to array
    res.setHeader('Content-Type', 'application/json'); // set JSON header
    res.status(200).json(users); // send response
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id); // get ObjectId from param
    const result = await mongodb.getDatabase().collection('users').find({ _id: userId });
    const users = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
};

// export controller functions
module.exports = {
    getAll,
    getSingle
};
