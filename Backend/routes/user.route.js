import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post("/register", upload.single("photo"), registerUser);

export default router;