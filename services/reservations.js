const Reservations = require ('../models/reservations');
const mongoose = require('mongoose');

// GET/catways/:id/reservations 
exports.getReservationsByCatway = async (req, res, next) => {
    try {
        const catwayNumber = parseInt(req.params.id, 10);

        if (isNaN(catwayNumber)) {
            return res.status(400).json({message: "ID non valide"});
        }

        const reservations = await Reservations.find({ catwayNumber: catwayNumber });

        if (!reservations || reservations.length === 0) {
            return res.status(404).json({
                message: "Aucune réservation trouvée pour ce catway"
            });
        }
        return res.status(200).json(reservations);
    } catch (error) {
        return res.status(500).json({message: "Erreur serveur"});
    }
};

// GET/catways/:id/reservations/:id


exports.getReservationById = async (req, res, next) => {
    try {
        const catwayNumber = parseInt(req.params.id, 10);
        const reservationId = req.params.idReservation;

        if (isNaN(catwayNumber)) {
            return res.status(400).json({ message: "ID du catway invalide" });
        }

        if (mongoose.Types.ObjectId.isValid(reservationId)) {
            return res.status(400).json({ message: "ID de la réservation invalide" });
        }

        const idReservation = new mongoose.Types.ObjectId(reservationId);

        const reservation = await Reservations.findOne({_id: idReservation,catwayNumber});

        if (!reservation) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }

        return res.status(200).json(reservation);

    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

//POST /catways/:id/reservations

exports.createReservation = async (req, res, next) => {
    try {
        const catwayNumber = parseInt(req.params.id, 10);
        const temp = {
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };

        if (isNaN(catwayNumber)) {
            return res.status(400).json({ message: "ID du catway invalide" });
        }
        if (![temp.clientName, temp.boatName, temp.startDate, temp.endDate].every(Boolean)) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }           
        const newReservation = new Reservations({ catwayNumber, ...temp });

        const save = await newReservation.save();
        return res.status(201).json(save);
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

//PUT /catways/:id/reservations 
exports.updateReservation = async (req, res) => {
    try {
        const catwayNumber = parseInt(req.params.id, 10);
        const ReservationId = req.params.idReservation;
        const data = req.body;

        if (isNaN(catwayNumber)) {
            return res.status(400).json({ message: "ID du catway invalide" });
        }

        if (!mongoose.Types.ObjectId.isValid(ReservationId)) {
            return res.status(400).json({ message: "ID de la réservation invalide" });
        }

        const idReservation = new mongoose.Types.ObjectId(ReservationId);
        const updated = await Reservations.findOneAndUpdate({ _id: idReservation, catwayNumber },data,{ new: true })

        if (!updated) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }

        return res.status(200).json(updated);

    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

//DELETE /catway/:id/reservations/:idReservation 

exports.deleteReservation = async (req, res, next) => {
    try {
        const catwayNumber = parseInt(req.params.id, 10);
        const ReservationId = req.params.idReservation;

        if (isNaN(catwayNumber)) {
            return res.status(400).json({ message: "ID du catway invalide" });
        }

        const deleted = await Reservations.findOneAndDelete({_id: ReservationId, catwayNumber});

        if (!deleted) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }

        return res.status(200).json({ message: "Réservation supprimée avec succès" });
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur" });
    }
};