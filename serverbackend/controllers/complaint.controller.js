import Complaint from "../models/complaint.model.js";

/* ================================
   CREATE COMPLAINT
================================ */
export const createComplaint = async (req, res) => {
  try {
    const {
      category,
      name,
      hostel,
      block,
      roomNo,
      rollNo,
      mobileNo,
      description,
    } = req.body;

    if (
      !category ||
      !name||
      !hostel ||
      !block ||
      !roomNo ||
      !rollNo ||
      !mobileNo ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const referenceId =
      "PUH" +
      Date.now().toString().slice(-6) +
      Math.floor(100 + Math.random() * 900);

    const complaint = await Complaint.create({
      category,
      name,
      hostel,
      block,
      roomNo,
      rollNo,
      mobileNo,
      description,
      referenceId,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      data: complaint,
    });
  } catch (error) {
    console.error("❌ Complaint Error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate reference ID. Try again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================================
   GET COMPLAINTS BY CATEGORY
================================ */
export const getComplaintsByCategory = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      category: req.params.category,
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================================
   UPDATE STATUS (Pending → Completed)
================================ */
export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (complaint.status.toLowerCase() !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending complaints can be updated",
      });
    }

    complaint.status = status || "Completed";
    await complaint.save();

    return res.json({
      success: true,
      message: "Status updated successfully",
      data: complaint,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================================
   DELETE COMPLAINT
================================ */
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    return res.json({
      success: true,
      message: "Complaint removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
