import { Router } from "express";
import { blockCard, changeCardPin, generateCardPin, issueCard, otpVerifyForPinChange } from "../controllers/card.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/card-issue', verifyJWT, issueCard);
router.post('/card-pin', verifyJWT, generateCardPin);
router.post('/pin-change', verifyJWT, changeCardPin);
router.post('/pin-otp-verify', verifyJWT, otpVerifyForPinChange);
router.post('/block-card', verifyJWT, blockCard);

export default router;