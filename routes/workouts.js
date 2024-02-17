const express = require('express');
const router = express.Router();

const workoutsController = require('../controllers/workouts');
const validation = require('../middleware/validate');

router.get('/', workoutsController.getAllWorkouts);

router.get('/:id', workoutsController.getSingleWorkout);

router.post('/', validation.saveWorkout, workoutsController.createWorkout);

router.put('/:id', validation.saveWorkout, workoutsController.updateWorkout);

router.delete('/:id', workoutsController.deleteWorkout);

module.exports = router;
