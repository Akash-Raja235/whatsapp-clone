
import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import sendOTP from "../config.js";
import mongoose from "mongoose";
// import cloudinary from "../utils/cloudinary.js";


const randomNumber = Math.floor(1000 + Math.random() * 9000)
const Signup = async(req, res)=>{
 
    const {name,phoneNo,picture} = req.body

  

    if(!name || !phoneNo){
       return res.status(400).json({msg:"All field are reuired"})
    }
    
  try {
    // const image = await cloudinary.uploader.upload(picture,{
    //   folder:"profilePic",
    //   width:500,
    //   crop:"scale"
    // }) 
    // console.log(image,'kkkk')
     const old = await User.findOne({phoneNo})
     if(old){
      return  res.status(400).json({msg:"phone number already exist"})
     }

     const user =  await User.create({
        name,
        phoneNo,
        // picture:{
        //   public_id:image.public_id,
        //   url:image.secure_url
        // },
        picture
     
     }) 
  
    

     
    //  const message = `your OTP code is ${randomNumber} plesase don't share to others `
    //  await  sendOTP(phoneNo)
    return res.status(201).json({msg:"you signed up"})
  } catch (error) {
    res.status(500).json({msg:error.message})
  }


} 

// const VerifyOtp = async(req, res)=>{
   
//   const {otp} = req.body

//    if(!otp){
//    return res.status(400).json({msg:"Plesase fill your otp code"})
//    }
//    if(otp === randomNumber){

//     return  res.status(200).json({msg:"OTP veried "})  
    
//    }else{
//    return res.status(400).json({msg:" please verified again"})
//    }



// }

const Login = async(req,res)=>{

    const {phoneNo} = req.body
 
    
    if(!phoneNo){
       return res.status(400).json({msg:"phone number is reuired"})
    }
    try {
        
        const user = await User.findOne({phoneNo})
      
        if(!user){
          return  res.status(400).json({msg:"phone number not Found"})  
        }
        if(phoneNo !== "+"+ user.phoneNo){
        return res.status(401).json({msg:"your phone number not match"})
        }

        // sendOTP(phoneNo,message,res)
        const token = jwt.sign({name:user.name,phoneNo},process.env.SECRET_KEY,{expiresIn:"30d"})
        return  res.status(200).json({msg:"user logged In",user, token})  
    } catch (error) {
      return  res.status(500).json({msg:error.message}) 
    }
}




// const Logout = async(req, res)=>{


// }



const SearchUser = async(req,res)=>{
  const nameField = req.query.name
  const userId = req.user._id
 try {
   
   const self = await User.find( req.user)
 const userName = self.name
 console.log(self)
  const users = await User.find({name:{$regex: nameField, $options: `$i`}})
    
  if(!users){
    return res.status(400).json({msg:"no any  user fond"})
  }
  res.status(200).json({msg:'ok' , users})

 } catch (error) {
  return res.status(500).json({msg:error.message})
 }

}




const sendFriendRequest = async(req, res)=>{

  const {sender,userId} = req.body

     
   try {
    
    const user = await User.findById(userId)

        
    if(!user.friendsList.includes(sender)){
  
      await User.updateOne({_id:userId},{$push:{friendsList:sender}})
      return res.status(200).json({msg:" sent request",user})
    }else{
      return res.status(400).json({msg:" you already sent request",})
      
    }
   } catch (error) {
    return res.status(500).json({msg:error.message})
   }


}


const acceptFriendRequest = async(req, res)=>{

   const { isfriend, userId,sender } = req.body
  

  
   try {
    const user = await User.findById(userId)


     if(!isfriend){
      await User.updateOne({_id:userId},{$pull:{friendsList:sender}})
      return res.status(200).json({msg:" your friend request is Rejected"})
    

     }else{
      await User.updateOne({_id:userId},{$pull:{friendsList:sender}})
      return res.status(200).json({msg:" your friend request is accepted"})
     }


   } catch (error) {
    return res.status(500).json({msg:error.message})
   }

}
  
const getAllFriendList = async(req, res)=>{

  const userId = req.user._id
   
  try {
    
    let user = await User.findById(userId)

     
  
    return res.status(200).json({msg:'friendsList got',friendsList:user.friendsList})

  } catch (error) {
    return res.status(500).json({msg:error.message})
  }

} 

const  Allusers = async(req, res)=>{
try {
  
  const users = await User.find({}).select('-phoneNo')
 
  return res.status(200).json({msg:'All users', users})
} catch (error) {
  return res.status(500).json({msg:error.message})
}

} 

export{Signup,Login,SearchUser,sendFriendRequest, acceptFriendRequest,getAllFriendList,Allusers}
