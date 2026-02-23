import Worker from "../models/Worker.js";
import jwt from "jsonwebtoken";

export const workerSignin = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    /* 1️⃣ Validation */
    if (!employeeId || !password) {
      return res.status(400).json({
        success: false,
        message: "Employee ID and Password are required"
      });
    }

    /* 2️⃣ Find Worker */
    const worker = await Worker.findOne({
      employeeId: employeeId.trim().toUpperCase()
    });

    if (!worker) {
      return res.status(400).json({
        success: false,
        message: "Invalid Employee ID or Password"
      });
    }

    /* 3️⃣ Compare Password */
    const isMatch = await worker.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Employee ID or Password"
      });
    }

    /* 4️⃣ Generate Token */
    const token = jwt.sign(
      { id: worker._id, role: "worker" },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "7d" }
    );

    /* 5️⃣ Send Response */
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: worker._id,
        name: worker.name,
        employeeId: worker.employeeId,
        designation: worker.designation
      }
    });

  } catch (error) {
    console.error("Signin Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};
