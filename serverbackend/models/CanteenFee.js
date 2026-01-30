import mongoose from "mongoose";

const canteenFeeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
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

/* ================= AUTO CALCULATIONS ================= */
canteenFeeSchema.pre("save", function (next) {
  // Prevent overpayment
  if (this.paidAmount > this.totalAmount) {
    return next(new Error("Paid amount cannot exceed total amount"));
  }

  // Calculate due
  this.dueAmount = this.totalAmount - this.paidAmount;

  // Set status automatically
  if (this.paidAmount === 0) this.status = "Pending";
  else if (this.paidAmount === this.totalAmount) this.status = "Paid";
  else this.status = "Partial";

  next();
});

/* ================= HANDLE UPDATES ALSO ================= */
canteenFeeSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.paidAmount !== undefined && update.totalAmount !== undefined) {
    if (update.paidAmount > update.totalAmount) {
      return next(new Error("Paid amount cannot exceed total amount"));
    }

    update.dueAmount = update.totalAmount - update.paidAmount;

    if (update.paidAmount === 0) update.status = "Pending";
    else if (update.paidAmount === update.totalAmount) update.status = "Paid";
    else update.status = "Partial";
  }

  next();
});

export default mongoose.model("CanteenFee", canteenFeeSchema);
