const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

// Import mongodb here
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use('/', require('./routes'));

// wrap it here
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
            console.log(`Database is listening and node Running on port ${port}`);
        });
    }
});
