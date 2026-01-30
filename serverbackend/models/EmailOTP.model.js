import mongoose from "mongoose";

const emailOTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // auto delete after expiry
    },
  },
  { timestamps: true }
);

export default mongoose.model("EmailOTP", emailOTPSchema);
