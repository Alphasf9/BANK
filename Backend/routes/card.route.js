import { Router } from "express";
import { generateCardPin, issueCard } from "../controllers/card.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/card-issue', verifyJWT, issueCard);
router.post('/card-pin', verifyJWT, generateCardPin)

export default router;