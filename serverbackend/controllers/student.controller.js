import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.model.js";

/* ======================================================
   CHECK ROLL NUMBER AVAILABILITY
====================================================== */
export const checkRollNoAvailability = async (req, res) => {
  try {
    const { rollNo } = req.params;
    const exists = await Student.findOne({ rollNo });

    res.status(200).json({ available: !exists });
  } catch (error) {
    console.error("ROLL CHECK ERROR:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

/* ======================================================
   REGISTER STUDENT
====================================================== */
export const registerStudent = async (req, res) => {
  try {
    const {
      name, email, password, phone,
      year, dept, branch, category,
      hostel, block, roomNo, rollNo
    } = req.body;

    if (!name || !email || !password || !phone || !year || !dept ||
        !branch || !category || !hostel || !block || !roomNo || !rollNo) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.files?.photo || !req.files?.signature) {
      return res.status(400).json({ error: "Photo and Signature are required" });
    }

    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      return res.status(400).json({ error: "Roll number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email: email.toLowerCase().trim(),
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
      photo: req.files.photo[0].path,
      signature: req.files.signature[0].path,
    });

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: student,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error.message);
    res.status(500).json({ error: "Registration failed", details: error.message });
  }
};

/* ======================================================
   🔐 LOGIN STUDENT
   POST /api/students/login
====================================================== */
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email }).select("+password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



/* ======================================================
   👤 GET MY ACCOUNT
   GET /api/students/my-account
====================================================== */
export const getMyAccount = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
      
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("MY ACCOUNT ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   GET STUDENT BY ID
====================================================== */
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("GET STUDENT ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   GET ALL STUDENTS
====================================================== */
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("name email phone dept roomNo rollNo");
    res.status(200).json(students);
  } catch (error) {
    console.error("GET ALL STUDENTS ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   DELETE STUDENT
====================================================== */
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    await Student.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error("DELETE STUDENT ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
