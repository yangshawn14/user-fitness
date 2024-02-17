const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/users');
const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', validation.saveUser, contactsController.createUser);

router.put('/:id', validation.saveUser, contactsController.updateUser);

router.delete('/:id', contactsController.deleteUser);

module.exports = router;
