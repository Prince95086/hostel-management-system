import express from "express";
import { generateQR, confirmPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/generate-qr", generateQR);
router.post("/confirm", confirmPayment);

export default router;
