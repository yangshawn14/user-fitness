const doc = {
    info: {
        title: 'Fitness Tracker API',
        description: 'This is my User Fitness API',
        version: '1.0.0',
    },
    host: 'fitness-tracker-q4c5.onrender.com/',
    schemes: ['https'],
};

const outputFile = './swagger.json';

module.exports = { doc, outputFile };
