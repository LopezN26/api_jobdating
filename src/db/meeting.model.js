/**
 *  Meeting document model
 */

 const mongoose = require('mongoose');

 const meetingSchema = new mongoose.Schema({
     time:{
         type:Date,
         required : true
     },
     place:{
         type:String,
         required:true
     },
     pParticipant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usersModel',
        required :true
     },
    sParticipant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usersModel',
        required :true
    }
 })

 const meeting = mongoose.model('meeting', meetingSchema)
 module.exports = meeting