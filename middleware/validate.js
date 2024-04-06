const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
    const validationRule = {
        username: "required|string",
        email: "required|email",
        password: "required|string",
        profile: {
            firstName: "required|string",
            lastName: "required|string",
            age: "required|string",
            gender: "required|string",
            height: "required|string",
            weight: "required|string",
            goals: "string"
        }
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveWorkout = (req, res, next) => {
    const validationRule = {
        workout: "required|string",
        muscleGroup: "required|string",
        date: "string",
        duration: "required|string",
        distance: "string",
        caloriesBurned: "required|string",
        notes: "string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveNutrition = (req, res, next) => {
    const validationRule = {
        food_item: "required|string",
        quantity: "required|string",
        calories: "required|string",
        protein: "required|string",
        carbohydrates: "required|string",
        fats: "required|string",
        meal_time: "string",
        notes: "string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveProgress = (req, res, next) => {
    const validationRule = {
        date: "required|string",
        weight: "required|string",
        waist_circumference: "string",
        body_fat_percentage: "string",
        fitness_goal: "required|string",
        achievements: "string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveUser,
    saveWorkout,
    saveNutrition,
    saveProgress
};