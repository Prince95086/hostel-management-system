import mongoose from "mongoose";

const workerAttendanceSchema = new mongoose.Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
    required: true,
  },

  // Store as Date instead of String (important for range queries)
  date: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    enum: ["present", "absent"],
    required: true,
    lowercase: true,
    trim: true,
  }

}, { timestamps: true });

/* One worker can have only one attendance record per day */
workerAttendanceSchema.index({ workerId: 1, date: 1 }, { unique: true });

/* Speed up date range queries */
workerAttendanceSchema.index({ date: 1 });

export default mongoose.model("WorkerAttendance", workerAttendanceSchema);
