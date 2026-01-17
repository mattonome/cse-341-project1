const router = require('express').Router();

// Root test route
router.get('/', (req, res) => {
  res.send('Hello World');
});

// Users routes
router.use('/users', require('./users'));

// Contacts routes
router.use('/contacts', require('./contacts'));

module.exports = router;
