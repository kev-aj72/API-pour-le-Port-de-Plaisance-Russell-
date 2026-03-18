const express = require('express');
const router = express.Router();

const service = require('../services/users');

router.get('/', service.getAll);
router.get('/:email', service.getByEmail);
router.post('/',service.create);
router.put('/:email', service.updateByEmail);
router.delete('/:email', service.deleteByEmail);

module.exports = router;
