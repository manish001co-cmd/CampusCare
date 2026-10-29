import { User } from "../models/User.js";
import { Appointment } from "../models/Appointment.js";
import { Task } from "../models/Task.js";

// GET /api/student/dashboard
export async function getStudentDashboard(req, res) {
  try {
    const user = req.user;
    const [appointments, tasks, mentor, counsellors] = await Promise.all([
      Appointment.find({ studentId: user._id }).sort({ createdAt: -1 }).lean(),
      Task.find({ studentId: user._id })
        .sort({ completed: 1, dueDate: 1 })
        .lean(),
      user.mentorId
        ? User.findById(user.mentorId)
            .select("fullName email designation office")
            .lean()
        : User.findOne({
            role: "teacher",
            fullName: user.mentor,
            department: user.department,
          })
            .select("fullName email designation office")
            .lean(),
      User.find({
        role: { $in: ["teacher", "hod"] },
        ...(user.department ? { department: user.department } : {}),
      })
        .select("fullName role department designation")
        .sort({ fullName: 1 })
        .lean(),
    ]);

    return res.json({
      success: true,
      profile: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email || "",
        department: user.department || "",
        identifier: user.identifier || "",
        semester: user.semester || "",
        phone: user.phone || "",
        emergencyContact: user.emergencyContact || "",
        preferredMode: user.preferredMode || "",
        bio: user.bio || "",
        mentor: mentor?.fullName || user.mentor || "",
        mentorEmail: mentor?.email || "",
        mentorRole: mentor?.designation || "",
        mentorOffice: mentor?.office || "",
        role: user.role,
      },
      counsellors: counsellors.map((counsellor) => ({
        id: counsellor._id,
        fullName: counsellor.fullName,
        role: counsellor.role,
        department: counsellor.department || "",
        designation: counsellor.designation || "",
      })),
      appointments,
      tasks,
      performance: {
        cgpa: user.gpa ?? null,
        attendance: user.attendance ?? null,
        totalSessionsCompleted: appointments.filter(
          (appointment) => appointment.status === "Completed"
        ).length,
        gpaGrowth: "",
        attendanceStatus:
          user.attendance == null
            ? ""
            : user.attendance >= 85
              ? "Above 85% requirement"
              : "Below 85% requirement",
        semesterTrend: [],
        recentHistory: appointments
          .filter((appointment) => appointment.status === "Completed")
          .map((appointment) => ({
            id: appointment._id,
            date: appointment.date,
            title: appointment.title,
            mentor: appointment.counsellorName,
            outcome: appointment.notes || "",
            type: appointment.type,
          })),
      },
    });
  } catch (error) {
    console.error("Student dashboard data error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching student dashboard.",
    });
  }
}

// PUT /api/student/profile
export async function updateStudentProfile(req, res) {
  try {
    const allowedFields = [
      "phone",
      "emergencyContact",
      "preferredMode",
      "bio",
    ];
    const updates = {};

    for (const field of allowedFields) {
      if (!Object.hasOwn(req.body, field)) continue;
      if (typeof req.body[field] !== "string") {
        return res.status(400).json({
          success: false,
          message: `${field} must be a string.`,
        });
      }
      updates[field] = req.body[field].trim();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one profile field to update.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    return res.json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Student profile update error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating profile.",
    });
  }
}

// POST /api/student/appointments
export async function createAppointment(req, res) {
  try {
    const user = req.user;
    const { counsellorName, type, title, date, time, location, notes } =
      req.body;

    if (
      typeof title !== "string" ||
      typeof date !== "string" ||
      typeof time !== "string" ||
      !title.trim() ||
      !date.trim() ||
      !time.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a title, date, and time.",
      });
    }
    if (
      type !== undefined &&
      !["academic", "career", "personal"].includes(type)
    ) {
      return res.status(400).json({
        success: false,
        message: "Select a valid counselling type.",
      });
    }
    const selectedCounsellor =
      typeof counsellorName === "string" && counsellorName.trim()
        ? counsellorName.trim()
        : user.mentor;
    const counsellor = selectedCounsellor
      ? await User.findOne({
          fullName: selectedCounsellor,
          role: { $in: ["teacher", "hod"] },
          ...(user.department ? { department: user.department } : {}),
        }).select("_id")
      : null;
    if (!counsellor) {
      return res.status(400).json({
        success: false,
        message: "Select an available counsellor from your department.",
      });
    }

    const appointment = await Appointment.create({
      studentId: user._id,
      studentUsername: user.username,
      counsellorName: selectedCounsellor,
      type: type || "academic",
      title: title.trim(),
      date: date.trim(),
      time: time.trim(),
      location:
        typeof location === "string" && location.trim()
          ? location.trim()
          : user.preferredMode || "",
      status: "Pending",
      notes: typeof notes === "string" ? notes.trim() : "",
    });

    return res.status(201).json({
      success: true,
      message: "Counselling appointment requested successfully.",
      appointment,
    });
  } catch (error) {
    console.error("Student appointment creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Error requesting appointment.",
    });
  }
}

// PATCH /api/student/tasks/:id/toggle
export async function toggleTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, studentId: req.user._id });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    task.completed = !task.completed;
    await task.save();

    return res.json({
      success: true,
      message: `Task marked as ${task.completed ? "completed" : "pending"}.`,
      task,
    });
  } catch (error) {
    console.error("Student task update error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating task.",
    });
  }
}
