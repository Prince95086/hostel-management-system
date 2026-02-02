import CanteenFee from "../models/CanteenFee.js";

/* ================= HELPER FUNCTION ================= */
const generateReceiptNumber = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const r = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `REC${y}${m}${d}${r}`;
};

/* ================= PHONE CLEAN + VALIDATE ================= */
const cleanPhone = (phone) => {
  if (!phone) return "";
  phone = phone.toString().replace(/[^0-9]/g, "");
  if (phone.startsWith("91") && phone.length === 12) {
    phone = phone.slice(2);
  }
  return phone;
};

const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

/* ================= SAVE NEW CANTEEN FEE RECORD ================= */
export const createCanteenFee = async (req, res) => {
  try {
    let {
      totalAmount = 0,
      paidAmount = 0,
      receiptNo,
      phoneNumber,
      studentPhone, // 👈 accept old field
    } = req.body;

    totalAmount = Number(totalAmount);
    paidAmount = Number(paidAmount);

    // Accept either name
    phoneNumber = cleanPhone(phoneNumber || studentPhone);

    if (!isValidPhone(phoneNumber)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (paidAmount > totalAmount) {
      return res.status(400).json({
        message: "Paid amount cannot exceed total amount",
      });
    }

    const dueAmount = totalAmount - paidAmount;

    let status = "Pending";
    if (paidAmount === totalAmount) status = "Paid";
    else if (paidAmount > 0) status = "Partial";

    if ((status === "Paid" || status === "Partial") && !receiptNo) {
      receiptNo = generateReceiptNumber();
    }

    const newRecord = new CanteenFee({
      ...req.body,
      phoneNumber, // always save under correct name
      totalAmount,
      paidAmount,
      dueAmount,
      status,
      receiptNo,
    });

    await newRecord.save();
    res.status(201).json(newRecord);

  } catch (error) {
    console.error("Error saving canteen fee:", error);
    res.status(500).json({ message: "Failed to save canteen fee record" });
  }
};

/* ================= GET LOGGED-IN STUDENT FEES ================= */
export const getMyCanteenFees = async (req, res) => {
  try {
    const records = await CanteenFee.find({ studentId: req.studentId })
      .sort({ year: -1, month: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your canteen fee data" });
  }
};

/* ================= GET STUDENT CANTEEN FEES ================= */
export const getStudentCanteenFees = async (req, res) => {
  try {
    const records = await CanteenFee.find({ studentId: req.params.studentId })
      .sort({ year: -1, month: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching canteen fee data" });
  }
};

/* ================= UPDATE CANTEEN FEE ================= */
export const updateCanteenFee = async (req, res) => {
  try {
    const { id } = req.params;
    let { totalAmount, paidAmount, receiptNo, phoneNumber, studentPhone } = req.body;

    totalAmount = Number(totalAmount);
    paidAmount = Number(paidAmount);

    phoneNumber = cleanPhone(phoneNumber || studentPhone);

    if (!isValidPhone(phoneNumber)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (paidAmount > totalAmount) {
      return res.status(400).json({
        message: "Paid amount cannot exceed total amount",
      });
    }

    const dueAmount = totalAmount - paidAmount;

    let status = "Pending";
    if (paidAmount === totalAmount) status = "Paid";
    else if (paidAmount > 0) status = "Partial";

    if ((status === "Paid" || status === "Partial") && !receiptNo) {
      receiptNo = generateReceiptNumber();
    }

    const updated = await CanteenFee.findByIdAndUpdate(
      id,
      { ...req.body, phoneNumber, totalAmount, paidAmount, dueAmount, status, receiptNo },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(updated);

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update canteen fee record" });
  }
};

/* ================= DELETE RECORD ================= */
export const deleteCanteenFee = async (req, res) => {
  try {
    const deleted = await CanteenFee.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
