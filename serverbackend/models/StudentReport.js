import mongoose from "mongoose";

const studentReportSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    studentId: { type: String, required: true },
    phoneNo: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Enter valid 10 digit phone number"],
    },
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