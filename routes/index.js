const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/workouts', require('./workouts'));
router.use('/nutrition', require('./nutrition'))
router.use('/progress', require('./progress'))

module.exports = router;
