import StudentReport from "../models/StudentReport.js";

export const createStudentReport = async (req, res) => {
  const report = await StudentReport.create(req.body);
  res.status(201).json(report);
};

export const getStudentReports = async (req, res) => {
  const reports = await StudentReport.find().sort({ createdAt: -1 });
  res.json(reports);
};

// 🔥 THIS IS THE IMPORTANT ONE
export const getStudentReportsByStudentId = async (req, res) => {
  const reports = await StudentReport.find({
    studentId: req.params.studentId,
  }).sort({ createdAt: -1 });

  res.json(reports);
};

export const updateStudentReport = async (req, res) => {
  const updated = await StudentReport.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteStudentReport = async (req, res) => {
  await StudentReport.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
