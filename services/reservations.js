const Reservations = require ('../models/reservations');


// GET/catways/:id/reservations 
exports.getReservationByCatway = async (req, res, next) => {
    const catwayId =req.params.id;

    try{
        const reservations = await Reservations.find({catwayNumber:catwayId});
        if(!reservations || reservations.length === 0) {
            return res.status(404).json({ message: "Aucune réservation trouvée pour ce catway" });
        }
        return res.status(200).json(reservations);

    } catch(error) {
        return res.status (501).json(error);
    }
};

// GET /catway/:id/reservations/:idReservation

exports.getReservationById = async (req, res, next) => {
   const catwayid      = req.params.id;
   const reservationid = req.params.id;

    try{
        let reservation = await Reservations.findOne({_id: reservationid, catwayNumber: catwayid });
        if (!reservation) {
            return res.status(404).json('Réservation introuvable pour ce catway');
        }
        return res.status(200).json(reservation);
        
    } catch (error) {
        return res. status(501).json(error);
    }
};

// POST/catways/:id/reservations 

exports.createReservation = async (req, res, next) => {
    const catwayId = req.params.id;
    const temp = ({
        catwayNumber  : catwayId,
        clientName    : req.body.clientName,
        boatName      : req.body.boatName,
        startDate     : req.body.startDate,
        endDate       : req.body.endDate
    });

    try {
        let reservation = await Reservations.create(temp);

        return res.status(201).json(reservation);
    } catch (error) {
        return res.status(501).json(error)
    }
};

// PUT/catways/:id/reservations 

exports.updateReservation = async(req, res, next) => {
    const catwayId        = req.params.id;
    const reservationId   = req.params.idReservation;
    
    const temp  = ({
        catwayNumber  : catwayId,
        clientName    : req.body.clientName,
        boatName      : req.body.boatName,
        startDate     : req.body.startDate,
        endDate       : req.body.endDate
    });

    try {
        const reservation = await Reservations.findOneAndUpdate({_id : reservationId, catawayNumber:catwayId});

          if (reservation) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    reservation[key] = temp[key];
                }
            });

            await reservation.save();
            return res.status(201).json(reservation);
        }
       return res.status(404).json('Réservation introuvable pour ce catway') 
    } catch (error) {
        return res.status(501).json(error);
    }
};

// DELETE/catway/:id/reservations/:idReservation 

exports.deleteReservation = async (req, res, next) => {
    const catwayId        = req.params.id;
    const reservationId   = req.params.id;

    try {
        await Reservations.findOneAndDelete ({_id: reservationId, catwayNumber: catwayId});
        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
};