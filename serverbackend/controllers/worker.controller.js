import Worker from "../models/Worker.js";
import bcrypt from "bcryptjs";

/* =====================================================
   ➕ ADD WORKER (WITH PASSWORD HASHING)
   ===================================================== */
export const addWorker = async (req, res) => {
  try {
    const { name, employeeId, phone, designation, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await Worker.findOne({ employeeId });
    if (existing) {
      return res.status(400).json({ message: "Employee ID already exists" });
    }

    // 🔥 Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const worker = await Worker.create({
      name,
      employeeId,
      phone,
      designation,
      password: hashedPassword
    });

    // ❌ Remove password before sending response
    const workerObj = worker.toObject();
    delete workerObj.password;

    res.status(201).json(workerObj);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   📋 GET ALL WORKERS (NO PASSWORD RETURNED)
   ===================================================== */
export const getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find()
      .select("-password")   // 🔥 hide password
      .sort({ createdAt: -1 });

    res.json(workers);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   ❌ DELETE WORKER
   ===================================================== */
export const deleteWorker = async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.json({ message: "Worker deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
