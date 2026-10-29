import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { Appointment } from "../models/Appointment.js";
import { Task } from "../models/Task.js";
import { User } from "../models/User.js";

const DEMO_PASSWORD = "password123";
const DEPARTMENT = "Computer Science & Engineering";

export const initialUsers = [
  {
    username: "student",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Aarav Sharma",
    email: "aarav.sharma@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-084",
    semester: "Semester 5",
    mentor: "Dr. Priya Nair",
    gpa: 8.6,
    attendance: 92,
    phone: "+91 98765 43210",
    emergencyContact: "+91 98765 01234 (Guardian)",
    preferredMode: "In-Person (Room 2B)",
    bio: "Interested in software engineering, distributed systems, and student wellbeing.",
  },
  {
    username: "student2",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Neha Singh",
    email: "neha.singh@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-112",
    semester: "Semester 3",
    mentor: "Dr. Priya Nair",
    gpa: 7.4,
    attendance: 82,
    phone: "+91 98765 12345",
    emergencyContact: "+91 98765 22345 (Guardian)",
    preferredMode: "Virtual Video Call",
    bio: "Working on study planning and confidence with core programming courses.",
  },
  {
    username: "student3",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Kabir Patel",
    email: "kabir.patel@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-139",
    semester: "Semester 1",
    mentor: "Prof. Arjun Mehta",
    gpa: 6.8,
    attendance: 73,
    phone: "+91 98765 34567",
    emergencyContact: "+91 98765 45678 (Guardian)",
    preferredMode: "Hybrid / Flexible",
    bio: "First-year student looking for academic and time-management support.",
  },
  {
    username: "teacher",
    password: DEMO_PASSWORD,
    role: "teacher",
    fullName: "Dr. Priya Nair",
    email: "priya.nair@campuscare.edu",
    department: DEPARTMENT,
    identifier: "FAC-CSE-104",
    phone: "+91 98765 11223",
    designation: "Associate Professor & Faculty Mentor",
    office: "Room 2B, CSE Faculty Wing",
    specialization: "Algorithms, academic advising, and student wellbeing",
    bio: "Faculty mentor supporting students with academic planning and counselling.",
  },
  {
    username: "teacher2",
    password: DEMO_PASSWORD,
    role: "teacher",
    fullName: "Prof. Arjun Mehta",
    email: "arjun.mehta@campuscare.edu",
    department: DEPARTMENT,
    identifier: "FAC-CSE-118",
    phone: "+91 98765 77889",
    designation: "Assistant Professor",
    office: "Room 3A, CSE Faculty Wing",
    specialization: "Programming fundamentals and first-year mentoring",
    bio: "Supports first-year students as they transition to university study.",
  },
  {
    username: "hod",
    password: DEMO_PASSWORD,
    role: "hod",
    fullName: "Dr. Rajesh Kulkarni",
    email: "hod.cse@campuscare.edu",
    department: DEPARTMENT,
    identifier: "HOD-CSE-001",
    designation: "Professor & Head of Department",
    office: "Room 101, Administrative Block",
    phone: "+91 98765 22334",
  },
  {
    username: "admin",
    password: DEMO_PASSWORD,
    role: "admin",
    fullName: "System Administrator",
    email: "admin@campuscare.edu",
    department: "Campus Administration",
    identifier: "ADMIN-001",
  },
];

const DEMO_USERNAMES = initialUsers.map(({ username }) => username);

function formatDate(offsetDays) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

export async function seedDatabase() {
  console.log("Checking database demo accounts...");
  for (const userData of initialUsers) {
    const existingUser = await User.findOne({
      username: userData.username,
    }).select("_id");
    if (existingUser) continue;

    await User.create(userData);
    console.log(
      `Created [${userData.role.toUpperCase()}] demo user: username='${userData.username}'`
    );
  }
  console.log("Default demo role accounts verified.");
}

export async function seedDemoData() {
  const demoUsers = await User.find({
    username: { $in: DEMO_USERNAMES },
  }).select("_id username");
  const demoUserIds = demoUsers.map((user) => user._id);

  await Promise.all([
    Appointment.deleteMany({
      $or: [
        { studentId: { $in: demoUserIds } },
        { studentUsername: { $in: DEMO_USERNAMES } },
      ],
    }),
    Task.deleteMany({
      $or: [
        { studentId: { $in: demoUserIds } },
        { studentUsername: { $in: DEMO_USERNAMES } },
      ],
    }),
  ]);
  await User.deleteMany({ username: { $in: DEMO_USERNAMES } });

  const users = await User.create(initialUsers);
  const byUsername = new Map(users.map((user) => [user.username, user]));
  const students = users.filter((user) => user.role === "student");
  const teachers = users.filter((user) => user.role === "teacher");
  const mentorAssignments = [
    ["student", "teacher"],
    ["student2", "teacher"],
    ["student3", "teacher2"],
  ];

  for (const [studentUsername, teacherUsername] of mentorAssignments) {
    const student = byUsername.get(studentUsername);
    const teacher = byUsername.get(teacherUsername);
    student.mentor = teacher.fullName;
    student.mentorId = teacher._id;
    await student.save();
  }

  const student = byUsername.get("student");
  const student2 = byUsername.get("student2");
  const student3 = byUsername.get("student3");
  const teacher = byUsername.get("teacher");
  const teacher2 = byUsername.get("teacher2");
  const appointmentRows = [
    {
      student,
      teacher,
      type: "academic",
      title: "Midterm study plan check-in",
      offset: 2,
      status: "Pending",
      notes: "Review study schedule and preparation goals.",
    },
    {
      student,
      teacher,
      type: "career",
      title: "Internship planning session",
      offset: 5,
      status: "Accepted",
      notes: "Discuss internship interests and next steps.",
    },
    {
      student: student2,
      teacher,
      type: "academic",
      title: "Programming course support",
      offset: 1,
      status: "Pending",
      notes: "Plan weekly practice and review current coursework.",
    },
    {
      student: student2,
      teacher,
      type: "personal",
      title: "Wellbeing follow-up",
      offset: -3,
      status: "Completed",
      notes: "Follow-up completed; continue the agreed study routine.",
    },
    {
      student: student3,
      teacher: teacher2,
      type: "academic",
      title: "First semester support meeting",
      offset: 3,
      status: "Pending",
      notes: "Discuss transition to university and programming support.",
    },
  ];

  await Appointment.insertMany(
    appointmentRows.map(({ student: owner, teacher: counsellor, ...row }) => ({
      studentId: owner._id,
      studentUsername: owner.username,
      counsellorName: counsellor.fullName,
      type: row.type,
      title: row.title,
      date: formatDate(row.offset),
      time: row.offset < 0 ? "10:00 AM - 10:45 AM" : "10:30 AM - 11:15 AM",
      location: "Counselling Room 2B",
      status: row.status,
      notes: row.notes,
    }))
  );

  const taskRows = [
    {
      student,
      teacher,
      title: "Complete weekly study routine",
      offset: 2,
      priority: "High",
      completed: false,
      feedback: "Bring a draft schedule to the next meeting.",
    },
    {
      student,
      teacher,
      title: "Review internship opportunities",
      offset: 5,
      priority: "Medium",
      completed: false,
      feedback: "List three roles that interest you.",
    },
    {
      student: student2,
      teacher,
      title: "Submit programming practice notes",
      offset: 1,
      priority: "Medium",
      completed: false,
      feedback: "Focus on the topics discussed in the last session.",
    },
    {
      student: student2,
      teacher,
      title: "Create a weekly study plan",
      offset: -1,
      priority: "Low",
      completed: true,
      feedback: "Good progress; review this plan next week.",
    },
    {
      student: student3,
      teacher: teacher2,
      title: "Attend programming lab support",
      offset: 3,
      priority: "High",
      completed: false,
      feedback: "Please bring questions from the first lab.",
    },
  ];

  await Task.insertMany(
    taskRows.map(({ student: owner, teacher: assigner, ...row }) => ({
      studentId: owner._id,
      studentUsername: owner.username,
      title: row.title,
      assignedBy: assigner.fullName,
      assignedById: assigner._id,
      dueDate: formatDate(row.offset),
      completed: row.completed,
      priority: row.priority,
      category: "Academic",
      feedback: row.feedback,
    }))
  );

  console.log(
    `Replaced demo data: ${students.length} students, ${teachers.length} teachers, ${appointmentRows.length} appointments, ${taskRows.length} tasks.`
  );
}

if (process.argv[1]?.endsWith("seedUsers.js")) {
  try {
    await connectDB();
    if (process.argv.includes("--demo-reset")) {
      await seedDemoData();
    } else {
      await seedDatabase();
    }
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}
