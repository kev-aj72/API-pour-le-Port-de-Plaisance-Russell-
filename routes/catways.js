const express = require('express');
const router = express.Router();

const service = require('../services/catways');

router.get('/catways', service.getAllCatways);;
router.get('/catways/:id', service.getCatwayById);
router.post('/catways', service.createCatway);
router.put('/catways/:id', service.updateCatway);
router.delete('/catways/:id', service.deleteCatway);


module.exports = router;