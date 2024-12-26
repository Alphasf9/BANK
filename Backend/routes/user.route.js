import { Router } from "express";
import { changePassword, getCurrentUser, loginUser, logoutUser, registerUser, updatePersonalDetails, updateUserPhoto } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", upload.single("photo"), registerUser);
router.post("/login",verifyJWT, loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.get("/getcurrentuser", verifyJWT, getCurrentUser);
router.put("/change-paassword", verifyJWT, changePassword);
router.put("/update-details", verifyJWT, updatePersonalDetails);
router.post("/update-photo", verifyJWT, upload.single("photo"),updateUserPhoto);

export default router;