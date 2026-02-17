import WorkerReport from "../models/WorkerReport.js";

export const createWorkerReport = async (req, res) => {
  try {
    const report = await WorkerReport.create(req.body);
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getWorkerReports = async (req, res) => {
  const reports = await WorkerReport.find().sort({ createdAt: -1 });
  res.json(reports);
};

export const updateWorkerReport = async (req, res) => {
  const report = await WorkerReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(report);
};

export const deleteWorkerReport = async (req, res) => {
  await WorkerReport.findByIdAndDelete(req.params.id);
  res.json({ message: "Worker report deleted" });
};
