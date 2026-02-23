import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const workerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },

  employeeId: { 
    type: String, 
    required: true, 
    unique: true,
    uppercase: true,   // 🔥 Always store uppercase
    trim: true
  },

  phone: { 
    type: String, 
    required: true 
  },

  designation: { 
    type: String 
  },

  // 🔐 Password field
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false   // 🔥 Do NOT return password in normal queries
  }

}, { timestamps: true });


/* =========================================
   🔐 HASH PASSWORD BEFORE SAVING
========================================= */
workerSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});


/* =========================================
   🔑 METHOD TO COMPARE PASSWORD (LOGIN)
========================================= */
workerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


export default mongoose.model("Worker", workerSchema);
