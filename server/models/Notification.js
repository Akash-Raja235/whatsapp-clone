

import mongoose from "mongoose";

const notificationschema  = mongoose.Schema({

  sender:[{
    type:mongoose.Types.ObjectId,
    ref:"User" 
  }],
  reciever:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },
  

},{timestamps:true})

export default mongoose.model("Notification", notificationschema)