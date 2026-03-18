const User = require ('../models/user');

// Get/users/
exports.getAll = async (req, res, next) => {
    try{
        let users = await User.find();
        return res.status(200).json(users);
    } catch(error) {
        return res.status (501).json(error);
    }
};

// GET/users/:email

exports.getByEmail = async (req, res, next) => {
   const email = req.params.email;

    try{
        let user = await User.findOne({email});
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json('Utilisateur non trouvé');
    } catch (error) {
        return res. status(501).json(error);
    }
};

// POST//users/

exports.create = async (req, res, next) => {
    const temp = ({
        email    : req.body.email,
        name     : req.body.name,
        firstname: req.body.firstname,
        password : req.body.password
    });

    try {
        let user = await User.create(temp);

        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(501).json(error)
    }
};

// PUT/users/:email

exports.updateByEmail = async(req, res, next) => {
    const email = req.params.email;
    const temp  = ({
        email    : req.body.email,
        name     : req.body.name,
        firstname: req.body.firstname,
        password : req.body.password
    });

    try {
        let user = await User.findOne({email : email});

        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });

            await user.save();
            return res.status(201).json(user);
        }
       return res.status(404).json('Utilisateur non trouvé') 
    } catch (error) {
        return res.status(501).json(error);
    }
};

// DELETE/users/:email

exports.deleteByEmail = async (req, res, next) => {
    const email = req.params.email

    try {
        await User.deleteOne ({email: email});
        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
};


