import express from "express"

import { verifyToken } from "../middleware/verify.js";
import { addToChat, chatFromId, createChat, deleteChat, exitChat, makeAdmin, removeAdmin, removeUser, userChat } from "../controller/chatController.js";

const router = express.Router();

router.post("/create", verifyToken, createChat);
router.get("/userchat", verifyToken, userChat);
router.get("/get/:id", verifyToken, chatFromId)
router.delete("/delete/:id", verifyToken, deleteChat)
router.put("/leavegroup/:id", verifyToken, exitChat)
router.put("/removeuser/:id", verifyToken, removeUser)
router.put("/addgroup/:id", verifyToken, addToChat, addToChat)
router.put("/makegroupadmin/:id", verifyToken, makeAdmin)
router.put("/removegroupadmin/:id", verifyToken, removeAdmin)
// router.get("/")

export default router;