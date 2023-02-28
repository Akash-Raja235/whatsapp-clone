

import mongoose from "mongoose";
const MessageSchema = mongoose.Schema({

    contactIds: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Conatct"
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      text: {
        type: String,
      },
    },
    { timestamps: true }
)




const Message  = mongoose.model("Message", MessageSchema)

 export default Message