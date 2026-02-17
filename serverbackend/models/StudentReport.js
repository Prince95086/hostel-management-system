import mongoose from "mongoose";

const studentReportSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    studentId: { type: String, required: true },
    date: { type: String, required: true },
    issueType: { type: String, required: true },
    description: { type: String, required: true },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    actionTaken: String,
  },
  { timestamps: true }
);

export default mongoose.model("StudentReport", studentReportSchema);
