const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all workouts
const getAllWorkouts = async (req, res, next) => {
    try {
        const workouts = await mongodb.getDb().db().collection('workouts').find().toArray();
        res.status(200).json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get workout by ID
const getSingleWorkout = async (req, res, next) => {
    const workoutId = new ObjectId(req.params.id);

    try {
        const workout = await mongodb.getDb().db().collection('workouts').findOne({ _id: workoutId });
        if (!workout) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }
        res.status(200).json(workout);
    } catch (error) {
        console.error('Error fetching workout by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Create new workout
const createWorkout = async (req, res, next) => {
    const { workout, muscleGroup, date, duration, distance, caloriesBurned, notes } = req.body;

    try {
        const result = await mongodb.getDb().db().collection('workouts').insertOne({
            workout,
            muscleGroup,
            date,
            duration,
            distance,
            caloriesBurned,
            notes
        });
        res.status(201).json({
            message: 'Workout created successfully',
            workoutId: result.insertedId,
        });
    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).json({ message: 'Failed to create workout' });
    }
};

// Update workout
const updateWorkout = async (req, res, next) => {
    const workoutId = new ObjectId(req.params.id);
    const { workout, muscleGroup, date, duration, distance, caloriesBurned, notes } = req.body;

    try {
        const result = await mongodb.getDb().db().collection('workouts').updateOne(
            { _id: workoutId },
            {
                $set: {
                    workout,
                    muscleGroup,
                    date,
                    duration,
                    distance,
                    caloriesBurned,
                    notes
                }
            }
        );
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: 'Workout not found' });
        } else {
            res.status(200).json({ message: 'Workout updated successfully' });
        }
    } catch (error) {
        console.error('Error updating workout:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete workout
const deleteWorkout = async (req, res, next) => {
    const workoutId = new ObjectId(req.params.id);

    try {
        const result = await mongodb.getDb().db().collection('workouts').deleteOne({ _id: workoutId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Workout not found' });
        } else {
            res.status(200).json({ message: 'Workout deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
};
