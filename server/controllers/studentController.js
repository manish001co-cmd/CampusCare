import { User } from "../models/User.js";
import { Appointment } from "../models/Appointment.js";
import { Task } from "../models/Task.js";

// Helper: Seed initial student data if none exists
async function ensureStudentData(user) {
  const aptCount = await Appointment.countDocuments({ studentUsername: user.username });
  if (aptCount === 0) {
    await Appointment.create([
      {
        studentId: user._id,
        studentUsername: user.username,
        counsellorName: "Mr.Dilp Menariya",
        type: "academic",
        title: "Academic stress & midterm preparation check-in",
        date: "2026-10-28",
        time: "10:30 AM - 11:30 AM",
        location: "Counselling Room 2B",
        status: "Accepted",
        notes: "Discussed strategies for distributed systems course and time allocation.",
      },
      {
        studentId: user._id,
        studentUsername: user.username,
        counsellorName: "Dr. Rajesh Kulkarni",
        type: "career",
        title: "Internship guidance & research roadmap",
        date: "2026-11-04",
        time: "02:00 PM - 02:45 PM",
        location: "HOD Office & Video Call",
        status: "Pending",
        notes: "Seeking advice on summer AI research applications.",
      },
      {
        studentId: user._id,
        studentUsername: user.username,
        counsellorName: "Dr. Sneha Roy",
        type: "personal",
        title: "Work-life balance & sleep hygiene consultation",
        date: "2026-10-12",
        time: "11:00 AM - 11:45 AM",
        location: "Student Wellness Center",
        status: "Completed",
        notes: "Session completed. Recommended 15-minute mindfulness breaks and sleep tracker.",
      },
    ]);
  }

  const taskCount = await Task.countDocuments({ studentUsername: user.username });
  if (taskCount === 0) {
    await Task.create([
      {
        studentId: user._id,
        studentUsername: user.username,
        title: "Complete weekly study routine plan",
        assignedBy: "Prof. Priya Nair",
        dueDate: "2026-10-29",
        completed: false,
        priority: "High",
        category: "Academic",
      },
      {
        studentId: user._id,
        studentUsername: user.username,
        title: "Review statistics tutoring resources & submit draft",
        assignedBy: "Prof. Priya Nair",
        dueDate: "2026-10-31",
        completed: true,
        priority: "Medium",
        category: "Academic",
      },
      {
        studentId: user._id,
        studentUsername: user.username,
        title: "Reflect on career goals for next consultation",
        assignedBy: "Dr. Rajesh Kulkarni",
        dueDate: "2026-11-03",
        completed: false,
        priority: "Medium",
        category: "Career",
      },
    ]);
  }
}

// GET /api/student/dashboard
export async function getStudentDashboard(req, res) {
  try {
    const user = req.user;
    await ensureStudentData(user);

    const appointments = await Appointment.find({ studentUsername: user.username }).sort({ createdAt: -1 });
    const tasks = await Task.find({ studentUsername: user.username }).sort({ completed: 1, dueDate: 1 });

    const performance = {
      cgpa: user.gpa || 8.6,
      attendance: user.attendance || 92,
      totalSessions: appointments.filter((a) => a.status === "Completed").length,
      trend: [
        { term: "Sem 1", gpa: 8.2 },
        { term: "Sem 2", gpa: 8.4 },
        { term: "Sem 3", gpa: 8.5 },
        { term: "Sem 4", gpa: 8.6 },
      ],
      recentHistory: [
        {
          id: 1,
          date: "Oct 20, 2026",
          title: "Mid-semester Academic Review",
          mentor: "Prof. Priya Nair",
          outcome: "Steady improvement in Algorithms. Study schedule adjusted.",
          type: "academic",
        },
        {
          id: 2,
          date: "Oct 12, 2026",
          title: "Stress Management Consultation",
          mentor: "Dr. Sneha Roy",
          outcome: "Wellbeing assessment complete. Follow-up scheduled.",
          type: "personal",
        },
        {
          id: 3,
          date: "Sep 25, 2026",
          title: "Career Pathway Assessment",
          mentor: "Dr. Rajesh Kulkarni",
          outcome: "Mapped internship opportunities in cloud and machine learning.",
          type: "career",
        },
      ],
    };

    return res.json({
      success: true,
      profile: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        department: user.department,
        identifier: user.identifier || "CS2026-084",
        semester: user.semester || "Semester 5 (Year 3)",
        phone: user.phone || "+91 98765 43210",
        emergencyContact: user.emergencyContact || "+91 98765 01234 (Guardian)",
        preferredMode: user.preferredMode || "In-Person (Room 2B)",
        bio: user.bio || "Computer Science student passionate about software systems and wellness.",
        mentor: user.mentor || "Prof. Priya Nair",
        role: user.role,
      },
      appointments,
      tasks,
      performance,
    });
  } catch (error) {
    console.error("Dashboard data error:", error);
    return res.status(500).json({ success: false, message: "Error fetching student dashboard", error: error.message });
  }
}

// PUT /api/student/profile
export async function updateStudentProfile(req, res) {
  try {
    const user = req.user;
    const { phone, emergencyContact, preferredMode, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          phone: phone !== undefined ? phone : user.phone,
          emergencyContact: emergencyContact !== undefined ? emergencyContact : user.emergencyContact,
          preferredMode: preferredMode !== undefined ? preferredMode : user.preferredMode,
          bio: bio !== undefined ? bio : user.bio,
        },
      },
      { new: true }
    ).select("-password");

    return res.json({
      success: true,
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating profile", error: error.message });
  }
}

// POST /api/student/appointments
export async function createAppointment(req, res) {
  try {
    const user = req.user;
    const { counsellorName, type, title, date, time, location, notes } = req.body;

    if (!title || !date || !time) {
      return res.status(400).json({ success: false, message: "Please provide title, date, and time." });
    }

    const appointment = await Appointment.create({
      studentId: user._id,
      studentUsername: user.username,
      counsellorName: counsellorName || "Prof. Priya Nair",
      type: type || "academic",
      title,
      date,
      time,
      location: location || "Counselling Room 2B",
      status: "Pending",
      notes: notes || "",
    });

    return res.status(201).json({
      success: true,
      message: "Counselling appointment requested successfully!",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error requesting appointment", error: error.message });
  }
}

// PATCH /api/student/tasks/:id/toggle
export async function toggleTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, studentUsername: req.user.username });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    task.completed = !task.completed;
    await task.save();

    return res.json({
      success: true,
      message: `Task marked as ${task.completed ? "completed" : "pending"}!`,
      task,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error toggling task", error: error.message });
  }
}
