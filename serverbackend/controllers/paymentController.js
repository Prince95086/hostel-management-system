import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import Payment from "../models/Payment.js";

// =============================
// 🔹 GENERATE QR
// =============================
export const generateQR = async (req, res) => {
  try {
    const { studentId, totalAmount } = req.body;

    if (!studentId || !totalAmount) {
      return res.status(400).json({ message: "Missing data" });
    }

    const transactionId = uuidv4();

    const upiId = "predgs@ybl";   // change if needed
    const name = "Hostel Fee";

    const upiURL = `upi://pay?pa=${upiId}&pn=${name}&am=${totalAmount}&cu=INR&tn=${transactionId}`;

    const qrImage = await QRCode.toDataURL(upiURL);

    // Save payment as pending
    await Payment.create({
      studentId,
      transactionId,
      amount: totalAmount,
      paymentMethod: "qr",
      status: "Pending",
    });

    res.json({
      qrImage,
      transactionId,
    });

  } catch (error) {
    console.error("QR Error:", error);
    res.status(500).json({ error: error.message });
  }
};


// =============================
// 🔹 CONFIRM PAYMENT
// =============================
export const confirmPayment = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = "Success";
    await payment.save();

    res.json({
      message: "Payment Confirmed",
      transactionId,
      status: payment.status,
    });

  } catch (error) {
    console.error("Confirm Error:", error);
    res.status(500).json({ error: error.message });
  }
};
