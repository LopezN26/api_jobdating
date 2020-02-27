/**
 * Connection to mongoDB
 */

const mongoose = require('mongoose');

const config = require('./dbconfig');

mongoose.Promise = global.Promise

const connectdb = ()=>{ //config de la connexion a la bd, via methode connect de mangoose
    return mongoose.connect(config.url,
        {
            useNewUrlParser : true,
            useUnifiedTopology:true
        })

}

module.exports = connectdb;