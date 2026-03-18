const express = require('express');
const router = express.Router();

const service = require('../services/catways');

router.get('/', service.getAllCatways);
router.get('/:id', service.getById);
router.post('/', service.create);
router.put('/:id', service.updateById);
router.delete('/:id', service.deleteById);

module.exports = router;