import WorkerAttendance from "../models/WorkerAttendance.js";

/* =====================================================
   💾 SAVE ATTENDANCE (Bulk Upsert)
   ===================================================== */
export const saveAttendance = async (req, res) => {
  try {
    const { date, attendance } = req.body;
    // date = "2026-01-31"
    // attendance = [{ workerId, status }]

    const attendanceDate = new Date(date); // 🔥 convert to Date type

    const operations = attendance.map(item => ({
      updateOne: {
        filter: {
          workerId: item.workerId,
          date: attendanceDate,
        },
        update: {
          $set: {
            workerId: item.workerId,
            status: item.status,
            date: attendanceDate,
          }
        },
        upsert: true,
      }
    }));

    await WorkerAttendance.bulkWrite(operations);

    res.json({ message: "Attendance saved successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   📅 GET ATTENDANCE BY SINGLE DATE
   ===================================================== */
export const getAttendanceByDate = async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999); // full day range

    const records = await WorkerAttendance.find({
      date: { $gte: date, $lte: end }
    }).populate("workerId");

    res.json(records);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   📊 GET WORKER ATTENDANCE BY DATE RANGE (For Reports)
   ===================================================== */
export const getWorkerAttendanceByRange = async (req, res) => {
  try {
    const { workerId } = req.params;
    const { startDate, endDate } = req.query;

    const records = await WorkerAttendance.find({
      workerId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: -1 });

    res.json(records);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
