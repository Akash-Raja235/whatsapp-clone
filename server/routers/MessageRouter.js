


import { Router } from "express";
import { createMessage, getAllChats} from "../controllers/messageController.js";
import router from "./UserRouter.js";
import authMiddleware from "../utils/AuthMiddleware.js";

router.post('/create-message',authMiddleware,createMessage) 

router.get('/:contactIds',authMiddleware,getAllChats)



 export default router