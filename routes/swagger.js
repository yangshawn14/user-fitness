const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('../swagger-config.json');
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerConfig.doc));

module.exports = router;
