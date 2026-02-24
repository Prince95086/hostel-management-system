import StudentReport from "../models/StudentReport.js";

// ✅ CREATE REPORT
export const createStudentReport = async (req, res) => {
  try {
    const report = await StudentReport.create(req.body);
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET ALL REPORTS (ADMIN)
export const getStudentReports = async (req, res) => {
  try {
    const reports = await StudentReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ LOGIN BY PHONE OR ROLL NO
export const getStudentReportsByLogin = async (req, res) => {
  try {
    const identifier = req.params.identifier.trim();

    const reports = await StudentReport.find({
      $or: [
        { studentId: identifier },   // roll number
        { phoneNo: identifier }      // phone number
      ]
    }).sort({ createdAt: -1 });

    if (!reports.length) {
      return res.status(404).json({ message: "No reports found" });
    }

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPDATE REPORT
export const updateStudentReport = async (req, res) => {
  try {
    const updated = await StudentReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ DELETE REPORT
export const deleteStudentReport = async (req, res) => {
  try {
    const deleted = await StudentReport.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({ message: "Student report deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};