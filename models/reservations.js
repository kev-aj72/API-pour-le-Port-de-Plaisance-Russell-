const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Reservation = new Schema({
    catwayNumber: {
        type : Number,
        trim : true,
        required : true
    },
    
    clientName: {
        type : String,
        trim : true,
        required : true
    },
    
    boatName: {
        type : String,
        trim : true,
        required : true
    },
    startDate: {
        type : Date,
        trim : true,
        required : true
    },
    endDate: {
        type : Date,
        trim : true,
        required : true
    }
},
     {
    timestamps: true
});

module.exports = mongoose.model('reservations', Reservation);