import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", upload.single("photo"), registerUser);
router.post("/login",verifyJWT, loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.get("/getcurrentuser", verifyJWT, getCurrentUser);

export default router;