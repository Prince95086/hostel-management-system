import mongoose from "mongoose";

const messFeeSchema = new mongoose.Schema(
  {
    /* 🔗 Student Reference */
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    /* 📱 Student Phone (for fast lookup) */
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    /* 📅 Fee Month & Year */
    month: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    /* 💰 Fee Details */
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
    paymentMethod: String,

    /* 📌 Payment Status */
    status: {
      type: String,
      enum: ["Pending", "Paid", "Partial"],
      default: "Pending",
    },

    /* 🧾 Receipt */
    receiptNo: String,
    remarks: String,
  },
  { timestamps: true }
);



/* ================= AUTO CALCULATIONS ================= */
messFeeSchema.pre("save", function (next) {
  if (this.paidAmount > this.totalAmount) {
    return next(new Error("Paid amount cannot exceed total amount"));
  }

  this.dueAmount = this.totalAmount - this.paidAmount;

  if (this.paidAmount === 0) this.status = "Pending";
  else if (this.paidAmount === this.totalAmount) this.status = "Paid";
  else this.status = "Partial";

  next();
});


/* ================= HANDLE UPDATES ALSO ================= */
messFeeSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  const existingDoc = await this.model.findOne(this.getQuery());

  if (!existingDoc) return next();

  const total = update.totalAmount ?? existingDoc.totalAmount;
  const paid = update.paidAmount ?? existingDoc.paidAmount;

  if (paid > total) {
    return next(new Error("Paid amount cannot exceed total amount"));
  }

  update.dueAmount = total - paid;

  if (paid === 0) update.status = "Pending";
  else if (paid === total) update.status = "Paid";
  else update.status = "Partial";

  next();
});
messFeeSchema.index({ studentId: 1, month: 1, year: 1 }, { unique: true });


export default mongoose.model("MessFee", messFeeSchema);
