import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { cardTransaction, credit, debit, transfer } from "../controllers/transaction.controller.js";

const router = Router();

router.post('/debit', verifyJWT, debit);
router.post('/credit', verifyJWT, credit);
router.post('/transfer', verifyJWT, transfer);
router.post('/card-transaction', verifyJWT, cardTransaction);

export default router;