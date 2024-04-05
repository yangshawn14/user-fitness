const express = require('express');
const router = express.Router();

const nutritionController = require('../controllers/nutrition');
const validation = require('../middleware/validate');

router.get('/', nutritionController.getAllNutrition);

router.get('/:id', nutritionController.getSingleNutrition);

router.post('/', validation.saveWorkout, nutritionController.createNutrition);

router.put('/:id', validation.saveWorkout, nutritionController.updateNutrition);

router.delete('/:id', nutritionController.deleteNutrition);

module.exports = router;
