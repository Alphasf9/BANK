import { Router } from "express";
import { blockCard, changeCardPin, generateCardPin, issueCard, otpVerifyForPinChange } from "../controllers/card.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { limiter } from "../middlewares/rateLimit.js";

const router = Router();

router.post('/card-issue',limiter,verifyJWT, issueCard);
router.post('/card-pin',limiter,verifyJWT, generateCardPin);
router.post('/pin-change',limiter,verifyJWT, changeCardPin);
router.post('/pin-otp-verify', verifyJWT, otpVerifyForPinChange);
router.post('/block-card', verifyJWT, blockCard);

export default router;
