const doc = {
    info: {
        title: 'Fitness Tracker API',
        description: 'This is my User Fitness API',
        version: '1.0.0',
    },
    host: 'user-fitness.onrender.com/',
    schemes: ['https'],
};

const outputFile = './swagger.json';

module.exports = { doc, outputFile };
