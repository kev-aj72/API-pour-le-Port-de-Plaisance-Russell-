const Catways = require ('../models/catways');

// GET toutes les catways
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catways.find();
        return res.status(200).json(catways);
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

// GET une catway par ID
exports.getCatwayById = async (req, res) => {
    try {
        const catwayNumber = parseInt(req.params.id, 10);
        if (isNaN(catwayNumber)) {
            return res.status(400).json({ message: "ID du catway invalide" });
        }

        const catway = await Catways.findOne({ catwayNumber });
        if (!catway) {
            return res.status(404).json({ message: "Catway non trouvée" });
        }

        return res.status(200).json(catway);
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

// POST créer une nouvelle catway
exports.createCatway = async (req, res) => {
    try {
        const temp = {
            catwayNumber: req.body.catwayNumber,
            catwayType: req.body.catwayType,
            catwayState: req.body.catwayState    
        };

        if (![temp.catwayNumber, temp.location, temp.capacity].every(Boolean)) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }
        const newCatway = new Catways(temp);
        const saveCatway = await newCatway.save();

        return res.status(201).json(saveCatway);
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

// PUT modifier une catway
exports.updateCatway = async (req, res) => {
    try {
        const catwayNumber = parseInt(req.params.id, 10);
        if (isNaN(catwayNumber)) {
            return res.status(400).json({ message: "ID du catway invalide" });
        }

        const updated = await Catways.findOneAndUpdate({ catwayNumber },req.body,{ new: true });

        if (!updated) {
            return res.status(404).json({ message: "Catway non trouvée" });
        }

        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

// DELETE une catway
exports.deleteCatway = async (req, res) => {
    try {
        const catwayNumber = parseInt(req.params.id, 10);
        if (isNaN(catwayNumber)) {
            return res.status(400).json({ message: "ID du catway invalide" });
        }

        const deleted = await Catways.findOneAndDelete({ catwayNumber });
        if (!deleted) {
            return res.status(404).json({ message: "Catway non trouvée" });
        }

        return res.status(200).json({ message: "Catway supprimée" });
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur" });
    }
};