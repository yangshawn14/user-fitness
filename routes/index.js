const express = require('express');
const router = express.Router();

router.use('/contacts', require('./users'));

module.exports = router;
