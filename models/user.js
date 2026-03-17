const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcrypt');

const User = new Schema({
    email: {
        type : String,
        trim : true,
        required : [true, "l'email est requis"],
        unique : true
    },
    name: {
        type : String,
        trim : true,
        required : [true, 'Le nom est requis'],
    },
    firstname: {
        type : String,
        trim : true
    },
    password: {
        type : String,
        trim : true
    },
}, {
    timestamps: true
});


User.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        return next(error);
    }  
});

module.exports = mongoose.model('user', User);