import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "fan",
        "electricity",
        "cleaning",
        "painting",
        "furniture",
        "food",
        "water",
        "wifi",
        "laundry",
      ],
    },

    hostel: {
      type: String,
      required: true,
      trim: true,
    },

    block: {
      type: String,
      required: true,
      trim: true,
    },

    roomNo: {
      type: String,
      required: true,
      match: /^[0-9]{1,4}$/,
    },

    rollNo: {
      type: String,
      required: true,
      match: /^[0-9]{1,10}$/,
    },
     name: {                        // ✅ FIXED
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      match: /^[A-Za-z ]+$/,        // Only letters & spaces
    },

    mobileNo: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
      trim: true,
    },

    // 🔥 FIXED STATUS ENUM
    status: {
      type: String,
      enum: ["Pending", "In Progress", "completed", "Resolved"],
      default: "Pending",
    },

    referenceId: {
  type: String,
  required: true,   // ❗ REQUIRED
  unique: true,
  index: true,
},
  },
  { timestamps: true }
);

complaintSchema.index({ category: 1 });

export default mongoose.model("Complaint", complaintSchema);
