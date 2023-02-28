

import User from "../models/User.js";

import Contact from '../models/ContactList.js'


 

const createContactList = async(req,res)=>{

    const {sender} = req.body
     const userId = req.user._id
   
    try {
       
       const contact = await Contact.create({
        contactIds:[sender,userId]
       })

        return res.status(201).json({msg:" contact has been created ",contact})
    } catch(error) {
        return res.status(500).json({msg:error.messsage})
    }


}


const getAllContacts = async(req, res)=>{
         
    
    try {
        let AllContacts = await Contact.find({
            contactIds: { $in: [req.params.userId] },
        }).populate('contactIds')
      
         
        res.status(200).json(AllContacts);
      } catch (error) {
        res.status(500).json(error);
      }
}







export {createContactList, getAllContacts}