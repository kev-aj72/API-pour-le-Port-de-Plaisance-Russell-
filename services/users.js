const User   = require ('../models/user');
const bcrypt = require ('bcrypt');
const jwt    = require ('jsonwebtoken');

// GET tous les utilisateurs
exports.getAllUsers = async (req, res, next) => {
    try{
        let users = await User.find();
        return res.status(200).json(users);
    } catch(error) {
       return res.status(500).json({ message: "Erreur serveur" });
    }
};

// GET un utilisateur par email

exports.getUserByEmail = async (req, res, next) => {
   const email = req.params.email;

    try{
        let user = await User.findOne({email});
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json('Utilisateur non trouvé');
    } catch (error) {
       return res.status(500).json({ message: "Erreur serveur" });
    }
};

// POST créer un nouvel utilisateur

exports.createUser = async (req, res, next) => {
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
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

// PUT modifier un utilisateur par email

exports.updateUserByEmail = async(req, res, next) => {
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
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

// DELETE un utilisateur par email

exports.deleteUserByEmail = async (req, res, next) => {
    const email = req.params.email

    try {
        await User.deleteOne ({email: email});
        return res.status(204).json('delete_ok');
    } catch (error) {
       return res.status(500).json({ message: "Erreur serveur" });
    }
};

// code pour l'authenticate

exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email }, '-__v -createdAt -updatedAt');

        if (user) {
            bcrypt.compare(password, user.password, async (err, response) => {
                if (err) {
                    console.error(err); 
                    return res.status(500).json({ message: "Erreur serveur" });
                }

                if (response) {
                    delete user._doc.password;

                    const expireIn = 24 * 60 * 60;  
                    const token = jwt.sign(
                        { userId: user._id },   
                        process.env.SECRET_KEY,  
                        { expiresIn: expireIn }  
                    );

                  
                    return res.status(200).json({
                        message: "Authentification réussie",
                        token: token  // Renvoyer le token dans la réponse
                    });
                }

                return res.status(403).json({ message: 'Identifiants incorrects' });
            });
        } else {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) { 
        return res.status(500).json({ message: "Erreur serveur" });
    }
};