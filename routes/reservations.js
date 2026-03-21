const express = require('express');
const router = express.Router();

const service = require('../services/reservations');

router.get('/catways/:id/reservations', service.getReservationsByCatway)
router.get('/catways/:id/reservations/:idReservation', service.getReservationById);
router.post('/catways/:id/reservations', service.createReservation);
router.put('/catways/:id/reservations/:idReservation', service.updateReservation);
router.delete('/catways/:id/reservations/:idReservation', service.deleteReservation);


module.exports = router;