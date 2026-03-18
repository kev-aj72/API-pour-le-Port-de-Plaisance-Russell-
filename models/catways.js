const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Catways = new Schema({
    catwayNumber: {
        type : Number,
        trim : true,
        required : true,
        unique : true
    },
    catwayType: {
        type : String,
        trim : true,
        required : true,
        Enumerator : ["long","short"]
    },
    catwayState: {
        type : String,
        trim : true,
        required : true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('catways', Catways);