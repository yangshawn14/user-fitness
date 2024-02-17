const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
    const validationRule = {
        username: "required|string",
        email: "required|email",
        password: "required|string",
        profile: {
            firstName: "required|string",
            lastName: "required|string",
            age: "required|integer",
            gender: "required|string",
            height: "required|float",
            weight: "required|float",
            goals: "required|string"
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

module.exports = {
    saveUser
};