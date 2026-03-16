const mongoose = require('mongoose');

const clientOptions ={
    userNewUrlPrser    : true,
    dbName             : 'apinode'
};

exports.initClientDbConnection = async () => {
    try{
        await mongoose.connect(process.env.URL_MONGO, clientOptions)
        console.log('Connected');
    } catch (error) {
        console.log(error);
        throw error;
    }
}