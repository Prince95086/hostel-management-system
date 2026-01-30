import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 IMPORTANT
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
    },

    year: { type: String, required: true },
    dept: { type: String, required: true },
    branch: { type: String, required: true },
    category: { type: String, required: true },

    hostel: { type: String, required: true },
    block: { type: String, required: true },
    roomNo: { type: String, required: true },

    rollNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    photo: { type: String, required: true },
    signature: { type: String, required: true },

    // 🔑 FORGOT PASSWORD FIELDS (ADDED)
    resetOtp: {
      type: String,
    },
    resetOtpExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
