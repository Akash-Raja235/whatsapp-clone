

import mongoose from "mongoose";

 const contactSchema = mongoose.Schema({

 contactIds:[
   {type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
 ]
 },{ timestamps: true})

 const Conatct = mongoose.model("Conatct",contactSchema)

 export default Conatct