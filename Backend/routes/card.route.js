import { Router } from "express";
import { issueCard } from "../controllers/card.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/card-issue', verifyJWT, issueCard);

export default router;