import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.model.js";

/* REGISTER */
export const registerStudent = async (req, res) => {
  try {
    const {
      name, email, password, phone,
      year, dept, branch, category,
      hostel, block, roomNo, rollNo
    } = req.body;

    if (!name || !email || !password || !rollNo)
      return res.status(400).json({ message: "Required fields missing" });

    const emailExists = await Student.findOne({ email });
    if (emailExists) return res.status(400).json({ message: "Email exists" });

    const rollExists = await Student.findOne({ rollNo });
    if (rollExists) return res.status(400).json({ message: "Roll exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      year,
      dept,
      branch,
      category,
      hostel,
      block,
      roomNo,
      rollNo,
    });

    res.status(201).json({ success: true, student });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

/* LOGIN (Used by your React page) */
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email }).select("+password");
    if (!student) return res.status(404).json({ message: "Student not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      student
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* GET LOGGED-IN STUDENT */
export const getMyAccount = async (req, res) => {
  const student = await Student.findById(req.user.id).select("-password");
  res.json(student);
};
