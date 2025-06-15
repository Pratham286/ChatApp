import express from "express"
import { verifyToken } from "../middleware/verify.js";
import { acceptFriendReq, cancelFriendReq, checkUser, declineFriendReq, getUser, searchAllUser, searchUser, sendFriendReq, unFriendReq } from "../controller/dashController.js";


const router = express.Router();

router.get("/verify", verifyToken, checkUser)
router.get("/getuser/:id", verifyToken, getUser)
router.post("/search", verifyToken, searchUser)
router.post("/searchall", verifyToken, searchAllUser)
router.get("/sendfriendreq/:id", verifyToken, sendFriendReq)
router.get("/cancelfriendreq/:id", verifyToken, cancelFriendReq)
router.get("/acceptfriendreq/:id", verifyToken, acceptFriendReq)
router.get("/unfriendreq/:id", verifyToken, unFriendReq)
router.get("/declinefriendreq/:id", verifyToken, declineFriendReq)
// router.post("/login", loginFunction)

export default router;