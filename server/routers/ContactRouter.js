import { Router } from "express";
import { createContactList, getAllContacts } from "../controllers/ContactController.js";

import authMiddleware from "../utils/AuthMiddleware.js";


// import authMiddleware from "../utils/AuthMiddleware.js";
const router = Router()

 

router.post('/create',authMiddleware,createContactList)
router.get('/all-contacts/:userId',authMiddleware,getAllContacts)
// router.put('/accept',accepRequest)
// router.get('/get-all-request/:userId',getAllRequest)
// router.get('/get-my-friends/:userId',findMyFriendRequest)
export default router