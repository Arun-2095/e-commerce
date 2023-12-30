const mongoose = require('mongoose');


let dataBase; 

const dbConnection = async () =>{
    try {
    dataBase = await mongoose.connect('mongodb://0.0.0.0:27017/Eccomerce');    
    } catch(err) {
       console.log(err);
       throw new Error(err.message);

    }
}

mongoose.connection.on('connected', () => console.log('DB connected'));

mongoose.connection.on('open', () => console.log('Db opened for queries'));

mongoose.connection.on('disconnected', () => console.log('Db disconnected'));

mongoose.connection.on('reconnected', () => console.log('Db reconnected'));

mongoose.connection.on('disconnecting', () => console.log('Db disconnecting'));

mongoose.connection.on('close', () => console.log('Db close'));
mongoose.set('debug', true);
dbConnection();


module.exports = {dataBase};