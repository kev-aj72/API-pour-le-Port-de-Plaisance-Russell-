const express = require('express');
const router = express.Router();

const service = require('../services/users');


router.get('/users', service.getAllUsers);
router.get('/users/:email', service.getUserByEmail);
router.post('/users', service.createUser);
router.put('/users/:email', service.updateUserByEmail);
router.delete('/users/:email', service.deleteUserByEmail);

router.post('/users/authenticate', service.authenticate);

module.exports = router;
