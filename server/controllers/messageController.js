


import User from "../models/User.js";

import Message from "../models/Message.js";
import { ObjectId } from 'mongoose'

import Conatct from "../models/ContactList.js";
const createMessage   = async (req, res)=>{
 
   const {contactIds, sender, text} = req.body

   if(!contactIds || !sender || !text){
    return res.status(400).json({msg:"please send valid input"})
   } 

   try {
    
    const textMesage = await Message.create({
      contactIds,
      sender,
       text
    })
       
  return  res.status(201).json({ msg:"message has created",textMesage})
   } catch (error) {
    return  res.status(500).json({ msg:error.message})
   }
     

}





const getAllChats = async(req,res)=>{
  
 
  try {
    const messages = await Message.find({
      contactIds: { $in: [req.params.contactIds] }
    }).populate('contactIds')
    res.status(200).json(messages);
 
} catch (error) {
    return res.status(500).json({msg:error.message})
}


}  






export {createMessage, getAllChats}