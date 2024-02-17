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

module.exports = {
    saveUser,
    saveWorkout
};