const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all progress
const getAllProgress = async (req, res, next) => {
    try {
        const progress = await mongodb.getDb().db().collection('progress').find().toArray();
        res.status(200).json(progress);
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get progress by ID
const getSingleProgress = async (req, res, next) => {
    const progressId = new ObjectId(req.params.id);

    try {
        const progress = await mongodb.getDb().db().collection('progress').findOne({ _id: progressId });
        if (!progress) {
            res.status(404).json({ message: 'progress not found' });
            return;
        }
        res.status(200).json(progress);
    } catch (error) {
        console.error('Error fetching progress by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Create new progress
const createProgress = async (req, res, next) => {
    const { date,
        weight,
        waist_circumference,
        body_fat_percentage,
        fitness_goal,
        achievements } = req.body;

    try {
        const result = await mongodb.getDb().db().collection('progress').insertOne({
            date,
            weight,
            waist_circumference,
            body_fat_percentage,
            fitness_goal,
            achievements
        });
        res.status(201).json({
            message: 'progress created successfully',
            progressId: result.insertedId,
        });
    } catch (error) {
        console.error('Error creating progress:', error);
        res.status(500).json({ message: 'Failed to create progress' });
    }
};

// Update progress
const updateProgress = async (req, res, next) => {
    const progressId = new ObjectId(req.params.id);
    const { date,
        weight,
        waist_circumference,
        body_fat_percentage,
        fitness_goal,
        achievements } = req.body;

    try {
        const result = await mongodb.getDb().db().collection('progress').updateOne(
            { _id: progressId },
            {
                $set: {
                    date,
                    weight,
                    waist_circumference,
                    body_fat_percentage,
                    fitness_goal,
                    achievements
                }
            }
        );
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: 'progress not found' });
        } else {
            res.status(200).json({ message: 'progress updated successfully' });
        }
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete progress
const deleteProgress = async (req, res, next) => {
    const progressId = new ObjectId(req.params.id);

    try {
        const result = await mongodb.getDb().db().collection('progress').deleteOne({ _id: progressId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'progress not found' });
        } else {
            res.status(200).json({ message: 'progress deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting progress:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllProgress,
    getSingleProgress,
    createProgress,
    updateProgress,
    deleteProgress,
};
