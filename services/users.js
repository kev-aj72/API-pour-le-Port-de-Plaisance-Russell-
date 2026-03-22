const User   = require ('../models/user');
const bcrypt = require ('bcrypt');
const jwt    = require ('jsonwebtoken');

// POST connexion user /login 

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' });
        }

        const user = await authenticate(email, password);

        if (!user) {
            return res.status(401).json({ error: 'Email ou mot de passe invalide' });
        }

        // Générer le token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: 24 * 60 * 60 } // 24h
        );

        return res.status(200).json({
            message: 'Authentification réussie',
            token: token
        });

    } catch (error) {
        console.error('Erreur login:', error);
        return res.status(500).json({ error: 'Erreur serveur' });
    }
};
// GET deconexion User/logout



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

const authenticate = async (email, password) => {
    const user = await User.findOne({ email: email });

    if (!user) return null; // Utilisateur non trouvé

    const isValid = await bcrypt.compare(password, user.password); // Comparaison sécurisée
    if (!isValid) return null; // Mot de passe incorrect

    delete user._doc.password; // Supprimer le mot de passe avant de renvoyer l'objet
    return user;
};
exports.authenticate = authenticate;