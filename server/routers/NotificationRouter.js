

import { Router } from "express";
import { sendNotification } from "../controllers/notificationController.js";




import authMiddleware from "../utils/AuthMiddleware.js";
const router = Router()



router.post('/sendNotification',sendNotification)

export default router