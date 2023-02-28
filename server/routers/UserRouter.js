

import { Router } from "express";


import {Signup,Login,SearchUser, sendFriendRequest, acceptFriendRequest, getAllFriendList, Allusers } from "../controllers/UserController.js";
import authMiddleware from "../utils/AuthMiddleware.js";
const router = Router()

router.post('/signup',Signup)
// router.post('/otp-verify',VerifyOtp)
router.post('/login',Login)
router.get('/search',authMiddleware,SearchUser)
router.get('/get-allfriends',authMiddleware,getAllFriendList)
router.get('/get-allUsers',authMiddleware,Allusers)
router.put('/send-friend-request',authMiddleware,sendFriendRequest)
router.put('/accept-friend-request',authMiddleware,acceptFriendRequest)


export default router