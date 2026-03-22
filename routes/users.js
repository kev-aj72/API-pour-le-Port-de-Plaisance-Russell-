const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');


router.get('/users', service.getAllUsers);
router.get('/users/:email', private.checkJWT, service.getUserByEmail);
router.post('/users', service.createUser);
router.put('/users/:email', private.checkJWT, service.updateUserByEmail);
router.delete('/users/:email', private.checkJWT, service.deleteUserByEmail);

router.post('/users/authenticate', service.authenticate);

module.exports = router;
