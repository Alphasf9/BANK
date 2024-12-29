import { Router } from "express";
import { changePassword, getCurrentUser, loginUser, logoutUser, registerUser, updateAccountDetails, updatePersonalDetails, updateUserPhoto } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", upload.single("photo"), registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.get("/getcurrentuser", verifyJWT, getCurrentUser);
router.put("/change-password", verifyJWT, changePassword);
router.put("/update-details", verifyJWT, updatePersonalDetails);
router.put("/update-account-details", verifyJWT, updateAccountDetails);
router.post("/update-photo", verifyJWT, upload.single("photo"),updateUserPhoto);

export default router;