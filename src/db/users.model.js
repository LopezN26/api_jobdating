/**
 * Users document model
 */

 const mongoose = require('mongoose') //require mongoose

 const usersSchema = new mongoose.Schema({ //création schema
     name:{ //définition des propriétés
         type:String,
         required:true
     },
     email:{
         type:String,
         required:true,
         unique:true
     },
     pro:{
         type:Boolean
     }
 })

 const usersDoc = mongoose.model('usersModel',usersSchema) //1er param = nom du modele

 module.exports = usersDoc //nom de la table ou nom de la constante