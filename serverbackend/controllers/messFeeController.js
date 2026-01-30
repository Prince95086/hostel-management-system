import MessFee from "../models/MessFee.js";
import Student from "../models/Student.model.js";

/* ================= HELPER FUNCTION ================= */
const generateReceiptNumber = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const r = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `REC${y}${m}${d}${r}`;
};





/* ================= CREATE MESS FEE ================= */
export const createMessFee = async (req, res) => {
  try {
    const { studentId } = req.body;

    // 🔍 Check student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    let { totalAmount = 0, paidAmount = 0, receiptNo } = req.body;

    totalAmount = Number(totalAmount);
    paidAmount = Number(paidAmount);

    if (paidAmount > totalAmount) {
      return res.status(400).json({ message: "Paid amount cannot exceed total amount" });
    }

    const dueAmount = totalAmount - paidAmount;

    let status = "Pending";
    if (paidAmount === totalAmount) status = "Paid";
    else if (paidAmount > 0) status = "Partial";

    if ((status === "Paid" || status === "Partial") && !receiptNo) {
      receiptNo = generateReceiptNumber();
    }

    const newRecord = new MessFee({
      ...req.body,
      phone: student.phone, // ✅ Auto insert phone
      totalAmount,
      paidAmount,
      dueAmount,
      status,
      receiptNo,
    });

    await newRecord.save();
    res.status(201).json(newRecord);

  } catch (error) {
    console.error("Create mess fee error:", error.message);
    res.status(500).json({ message: error.message || "Failed to save mess fee record" });
  }
};





/* ================= GET MESS FEES BY STUDENT ================= */
export const getStudentMessFees = async (req, res) => {
  try {
    const records = await MessFee.find({ studentId: req.params.studentId })
      .sort({ year: -1, month: -1 });

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching mess fee data" });
  }
};





/* ================= GET MESS FEES BY PHONE (🔥 YOUR FRONTEND NEEDS THIS) ================= */
export const getMessFeesByPhone = async (req, res) => {
  try {
    const records = await MessFee.find({ phone: req.params.phone })
      .sort({ year: -1, month: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mess fee by phone" });
  }
};





/* ================= UPDATE MESS FEE ================= */
export const updateMessFee = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await MessFee.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Record not found" });
    }

    let totalAmount = req.body.totalAmount ?? existing.totalAmount;
    let paidAmount = req.body.paidAmount ?? existing.paidAmount;
    let receiptNo = req.body.receiptNo ?? existing.receiptNo;

    totalAmount = Number(totalAmount);
    paidAmount = Number(paidAmount);

    if (paidAmount > totalAmount) {
      return res.status(400).json({ message: "Paid amount cannot exceed total amount" });
    }

    const dueAmount = totalAmount - paidAmount;

    let status = "Pending";
    if (paidAmount === totalAmount) status = "Paid";
    else if (paidAmount > 0) status = "Partial";

    if ((status === "Paid" || status === "Partial") && !receiptNo) {
      receiptNo = generateReceiptNumber();
    }

    const updated = await MessFee.findByIdAndUpdate(
      id,
      { ...req.body, totalAmount, paidAmount, dueAmount, status, receiptNo },
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: "Failed to update mess fee record" });
  }
};





/* ================= DELETE MESS FEE ================= */
export const deleteMessFee = async (req, res) => {
  try {
    const deleted = await MessFee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Record not found" });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
