import mongoose from "mongoose";

/* ================= SCHEMA ================= */
const canteenFeeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      index: true,
      required: true,
    },

    // ✅ Main Phone Field
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Phone must be a valid 10-digit Indian number"],
    },

    month: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    dueAmount: {
      type: Number,
      default: 0,
    },

    paymentDate: Date,

    paymentMethod: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Partial"],
      default: "Pending",
    },

    receiptNo: {
      type: String,
      trim: true,
    },

    remarks: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

/* ================= PHONE AUTO-FIX (IMPORTANT) ================= */
canteenFeeSchema.pre("validate", function (next) {
  // Accept old field name
  if (!this.phoneNumber && this.studentPhone) {
    this.phoneNumber = this.studentPhone;
  }

  if (this.phoneNumber) {
    let phone = this.phoneNumber.toString().replace(/[^0-9]/g, "");

    if (phone.startsWith("91") && phone.length === 12) {
      phone = phone.slice(2);
    }

    this.phoneNumber = phone;
  }

  next();
});

/* ================= AUTO CALCULATIONS (SAVE) ================= */
canteenFeeSchema.pre("save", function (next) {
  if (this.paidAmount > this.totalAmount) {
    return next(new Error("Paid amount cannot exceed total amount"));
  }

  this.dueAmount = this.totalAmount - this.paidAmount;

  if (this.paidAmount === 0) this.status = "Pending";
  else if (this.paidAmount === this.totalAmount) this.status = "Paid";
  else this.status = "Partial";

  next();
});

/* ================= AUTO CALCULATIONS (UPDATE) ================= */
canteenFeeSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // Accept old name in update
  if (update.studentPhone && !update.phoneNumber) {
    update.phoneNumber = update.studentPhone;
  }

  if (update.phoneNumber) {
    let phone = update.phoneNumber.toString().replace(/[^0-9]/g, "");
    if (phone.startsWith("91") && phone.length === 12) {
      phone = phone.slice(2);
    }
    update.phoneNumber = phone;
  }

  const doc = await this.model.findOne(this.getQuery());
  const total = update.totalAmount ?? doc.totalAmount;
  const paid = update.paidAmount ?? doc.paidAmount;

  if (paid > total) {
    return next(new Error("Paid amount cannot exceed total amount"));
  }

  update.dueAmount = total - paid;

  if (paid === 0) update.status = "Pending";
  else if (paid === total) update.status = "Paid";
  else update.status = "Partial";

  next();
});

/* ================= PREVENT DUPLICATE MONTH ENTRY ================= */
canteenFeeSchema.index({ studentId: 1, month: 1, year: 1 }, { unique: true });

/* ================= EXPORT ================= */
export default mongoose.model("CanteenFee", canteenFeeSchema);
