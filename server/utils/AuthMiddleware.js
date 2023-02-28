
import User from "../models/User.js";

import Jwt from 'jsonwebtoken'
const authMiddleware = async(req,res,next)=>{

    const {authorization} = req.headers
   

    if(authorization && authorization.startsWith('Bearer')){
    try {
     
        const token  = authorization.split(' ')[1]
            
        // verify
        
        const {phoneNo} = Jwt.verify(token,process.env.SECRET_KEY)
        req.user = await User.findOne({phoneNo})
       

         next()
        
    } catch (error) {
        return res.status(401).json({msg:"unauthorized"}) 
    }
}else{
        return res.status(400).json({msg:"not any token found"})
    }
}

export default authMiddleware