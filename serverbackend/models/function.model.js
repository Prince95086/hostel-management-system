import mongoose from "mongoose";

const functionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  organizer: { type: String, required: true },
  contact: { type: String, required: true },
  expectedGuests: { type: Number, required: true },
  budget: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Function", functionSchema);
