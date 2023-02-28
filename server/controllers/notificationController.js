

import User from "../models/User.js";

import Notification from "../models/Notification.js";


const sendNotification = async(req,res)=>{
    const {sender , reciever} = req.body

     

     try {
       
      const rec = await Notification.findOne({reciever})
      if(sender === rec.sender){
         return res.status(400).json({msg:" you already sent request"})
      }
        
      const user = await Notification.create({
         sender,
         reciever
      })
        
       
     } catch (error) {
        return res.status(500).json({mag:error.message})
     }  
} 


const getAllNotification =async(req, res)=>{


} 

export {sendNotification,getAllNotification}