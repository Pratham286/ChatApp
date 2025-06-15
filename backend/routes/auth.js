import express from "express"
import { loginFunction, logoutFunction, signupFuntion } from "../controller/authController.js";
import { verifyToken } from "../middleware/verify.js";


const router = express.Router();

router.post("/signup", signupFuntion)
// router.post("/signupmany", signupMany)
router.post("/login", loginFunction)
router.get("/logout", verifyToken, logoutFunction)

export default router;