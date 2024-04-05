const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all nutrition
const getAllNutrition = async (req, res, next) => {
    try {
        const nutrition = await mongodb.getDb().db().collection('nutrition').find().toArray();
        res.status(200).json(nutrition);
    } catch (error) {
        console.error('Error fetching nutrition:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get nutrition by ID
const getSingleNutrition = async (req, res, next) => {
    const nutritionId = new ObjectId(req.params.id);

    try {
        const nutrition = await mongodb.getDb().db().collection('nutrition').findOne({ _id: nutritionId });
        if (!nutrition) {
            res.status(404).json({ message: 'nutrition not found' });
            return;
        }
        res.status(200).json(nutrition);
    } catch (error) {
        console.error('Error fetching nutrition by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Create new nutrition
const createNutrition = async (req, res, next) => {
    const { food_item, quantity, calories, protein, carbohydrates, fats, meal_time, notes } = req.body;

    try {
        const result = await mongodb.getDb().db().collection('nutrition').insertOne({
            food_item, quantity, calories, protein, carbohydrates, fats, meal_time, notes
        });
        res.status(201).json({
            message: 'nutrition created successfully',
            nutritionId: result.insertedId,
        });
    } catch (error) {
        console.error('Error creating nutrition:', error);
        res.status(500).json({ message: 'Failed to create nutrition' });
    }
};

// Update nutrition
const updateNutrition = async (req, res, next) => {
    const nutritionId = new ObjectId(req.params.id);
    const { food_item, quantity, calories, protein, carbohydrates, fats, meal_time, notes } = req.body;

    try {
        const result = await mongodb.getDb().db().collection('nutrition').updateOne(
            { _id: nutritionId },
            {
                $set: {
                    food_item, quantity, calories, protein, carbohydrates, fats, meal_time, notes
                }
            }
        );
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: 'Nutrition not found' });
        } else {
            res.status(200).json({ message: 'Nutrition updated successfully' });
        }
    } catch (error) {
        console.error('Error updating nutrition:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete nutrition
const deleteNutrition = async (req, res, next) => {
    const nutritionId = new ObjectId(req.params.id);

    try {
        const result = await mongodb.getDb().db().collection('nutrition').deleteOne({ _id: nutritionId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'nutrition not found' });
        } else {
            res.status(200).json({ message: 'nutrition deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting nutrition:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllNutrition,
    getSingleNutrition,
    createNutrition,
    updateNutrition,
    deleteNutrition,
};
