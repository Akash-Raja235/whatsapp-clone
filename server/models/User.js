

import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phoneNo:{
     type:Number,
     required:true,
     unique:true
    },

    picture:{
        type:String,
         required:true
       
    },

    status:{
        type:String,
        default:"online"
    },
    isVerify:{
        type:Boolean,
        default:false
    },
    friendsList:[]

},{timeStamp:true}) 

const User = mongoose.model('User',UserSchema)

export default User