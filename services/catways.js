const Catways = require ('../models/catways');

// Get/catways/
exports.getAllCatways = async (req, res, next) => {
    try{
        let catways = await Catways.find();
        return res.status(200).json(catways);
    } catch(error) {
        return res.status (501).json(error);
    }
};

// GET/catways/:id 

exports.getById = async (req, res, next) => {
   const id = req.params.id;

    try{
        let catway = await Catways.findById(id);
        if (catway) {
            return res.status(200).json(catway);
        }
        return res.status(404).json('Catway non trouvé');
    } catch (error) {
        return res. status(501).json(error);
    }
};

// POST/catways/

exports.create = async (req, res, next) => {
    const temp = ({
        catwayNumber  : req.body.catwayNumber,
        catwayType    : req.body.catwayType,
        catwayState   : req.body.catwayState
    });

    try {
        let catway = await Catways.create(temp);

        return res.status(201).json(catway);
    } catch (error) {
        return res.status(501).json(error)
    }
};

// PUT/catway/:id

exports.updateById = async(req, res, next) => {
    const id = req.params.id;
    const temp  = ({
        catwayNumber  : req.body.catwayNumber,
        catwayType    : req.body.catwayType,
        catwayState   : req.body.catwayState,
    });

    try {
        let catway = await Catways.findOne({_id : id});

        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });

            await catway.save();
            return res.status(201).json(catway);
        }
       return res.status(404).json('catway non trouvé') 
    } catch (error) {console.log(error);
        return res.status(501).json(error);
    }
};

// DELETE/catway/:id

exports.deleteById = async (req, res, next) => {
    const id = req.params.id

    try {
        await Catways.deleteOne ({_id: id});
        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
};