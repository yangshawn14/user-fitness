const doc = {
    info: {
        title: 'Contacts API',
        description: 'This is my Contacts API',
        version: '1.0.0',
    },
    host: 'connect-mongodb.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';

module.exports = { doc, outputFile };
