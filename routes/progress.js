const express = require('express');
const router = express.Router();

const progressController = require('../controllers/progress');
const validation = require('../middleware/validate');

router.get('/', progressController.getAllProgress);

router.get('/:id', progressController.getSingleProgress);

router.post('/', validation.saveWorkout, progressController.createProgress);

router.put('/:id', validation.saveWorkout, progressController.updateProgress);

router.delete('/:id', progressController.deleteProgress);

module.exports = router;
