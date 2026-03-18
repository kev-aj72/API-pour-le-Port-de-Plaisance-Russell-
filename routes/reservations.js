const express = require('express');
const router = express.Router();

const service = require('../services/reservations');

router.get('/catways/:id/reservations', service.getReservationByCatway);
router.get('/catway/:id/reservations/:idReservations', service.getReservationById);
router.post('/catways/:id/reservations', service.createReservation);
router.put('/catway/:id/reservations/:idReservation', service.getReservationById);
router.delete('/catway/:id/reservations/:idReservation ', service.deleteReservation);

module.exports = router;