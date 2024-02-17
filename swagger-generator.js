const swaggerAutogen = require('swagger-autogen')();
const { doc, outputFile } = require('./swagger-config');

// Generate swagger.json
swaggerAutogen(outputFile, ['./routes/index.js'], doc).then(() => {
  console.log('Swagger JSON file has been generated successfully');
});
