import Worker from "../models/Worker.js";
import jwt from "jsonwebtoken";

export const workerLogin = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    const worker = await Worker.findOne({ employeeId });
    if (!worker) return res.status(400).json({ message: "Invalid ID or password" });

    const isMatch = await worker.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid ID or password" });

    const token = jwt.sign(
      { id: worker._id, role: "worker" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      worker: {
        _id: worker._id,
        name: worker.name,
        employeeId: worker.employeeId,
        designation: worker.designation
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
