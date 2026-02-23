import Complaint from "../models/complaint.model.js";

/* =====================================
   GET COMPLAINTS BY PHONE (WEB API)
   GET /api/complaints/phone/:mobileNo
===================================== */
export const getComplaintsByPhone = async (req, res) => {
  try {
    const { mobileNo } = req.params;

    // ✅ Validate phone number
    if (!mobileNo || !/^[0-9]{10}$/.test(mobileNo)) {
      return res.status(400).json({
        success: false,
        message: "Valid 10-digit mobile number is required",
      });
    }

    // ✅ Fetch complaints
    const complaints = await Complaint.find({ mobileNo })
      .sort({ createdAt: -1 });

    if (!complaints || complaints.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No complaints found for this phone number",
      });
    }

    // ✅ Status counts (case-insensitive safe check)
    const pending = complaints.filter(
      (c) => c.status?.toLowerCase() === "pending"
    ).length;

    const completed = complaints.filter(
      (c) => c.status?.toLowerCase() === "completed"
    ).length;

    const inProgress = complaints.filter(
      (c) => c.status?.toLowerCase() === "in progress"
    ).length;

    return res.status(200).json({
      success: true,
      total: complaints.length,
      pending,
      completed,
      inProgress,
      data: complaints,
    });

  } catch (error) {
    console.error("Error fetching complaints:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};