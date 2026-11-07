import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { connectDB } from "../config/db.js";
import { Appointment } from "../models/Appointment.js";
import { Task } from "../models/Task.js";
import { User } from "../models/User.js";

const DEMO_PASSWORD = "password123";
const DEPARTMENT = "Computer Science & Engineering";

export const initialUsers = [
  {
    username: "admin",
    password: DEMO_PASSWORD,
    role: "admin",
    fullName: "System Administrator",
    email: "admin@campuscare.edu",
    department: "Campus Administration",
    identifier: "ADMIN-001",
  },
  {
    username: "student",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Aarav Sharma",
    email: "aarav.sharma@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-001",
    semester: "Semester 5",
    mentor: "Mr. Dilip Menariya",
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
    identifier: "CSE-2026-002",
    semester: "Semester 3",
    mentor: "Mr. Dilip Menariya",
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
    identifier: "CSE-2026-003",
    semester: "Semester 1",
    mentor: "Ms. Yukti Tiwari",
    gpa: 6.8,
    attendance: 73,
    phone: "+91 98765 34567",
    emergencyContact: "+91 98765 45678 (Guardian)",
    preferredMode: "Hybrid / Flexible",
    bio: "First-year student looking for academic and time-management support.",
  },
  {
    username: "student4",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Riya Kapoor",
    email: "riya.kapoor@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-004",
    semester: "Semester 5",
    mentor: "Mr. Dilip Menariya",
    gpa: 8.4,
    attendance: 90,
    phone: "+91 98765 20011",
    emergencyContact: "+91 98765 20012 (Guardian)",
    preferredMode: "In-Person (Room 2B)",
    bio: "Interested in mentoring support and project-based learning.",
  },
  {
    username: "student5",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Ishaan Verma",
    email: "ishaan.verma@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-005",
    semester: "Semester 4",
    mentor: "Mr. Dilip Menariya",
    gpa: 7.9,
    attendance: 88,
    phone: "+91 98765 20021",
    emergencyContact: "+91 98765 20022 (Guardian)",
    preferredMode: "Virtual Video Call",
    bio: "Strives to improve academic planning and communication confidence.",
  },
  {
    username: "student6",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Meera Joshi",
    email: "meera.joshi@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-006",
    semester: "Semester 4",
    mentor: "Mr. Dilip Menariya",
    gpa: 8.1,
    attendance: 93,
    phone: "+91 98765 20031",
    emergencyContact: "+91 98765 20032 (Guardian)",
    preferredMode: "Hybrid / Flexible",
    bio: "Interested in balancing academics with personal wellbeing and mentoring support.",
  },
  {
    username: "student7",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Vihaan Nair",
    email: "vihaan.nair@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-007",
    semester: "Semester 3",
    mentor: "Mr. Dilip Menariya",
    gpa: 7.5,
    attendance: 84,
    phone: "+91 98765 20041",
    emergencyContact: "+91 98765 20042 (Guardian)",
    preferredMode: "In-Person (Room 2B)",
    bio: "Working on time-management and study routines with mentor guidance.",
  },
  {
    username: "student8",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Ananya Rao",
    email: "ananya.rao@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-008",
    semester: "Semester 5",
    mentor: "Mr. Dilip Menariya",
    gpa: 8.7,
    attendance: 95,
    phone: "+91 98765 20051",
    emergencyContact: "+91 98765 20052 (Guardian)",
    preferredMode: "Virtual Video Call",
    bio: "Looking for structured academic mentoring and career planning support.",
  },
  {
    username: "student9",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Dhruv Sen",
    email: "dhruv.sen@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-009",
    semester: "Semester 2",
    mentor: "Mr. Dilip Menariya",
    gpa: 7.2,
    attendance: 80,
    phone: "+91 98765 20061",
    emergencyContact: "+91 98765 20062 (Guardian)",
    preferredMode: "Hybrid / Flexible",
    bio: "Needs support with coursework load and confidence in programming labs.",
  },
  {
    username: "student10",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Pooja Iyer",
    email: "pooja.iyer@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-010",
    semester: "Semester 4",
    mentor: "Mr. Dilip Menariya",
    gpa: 8.3,
    attendance: 89,
    phone: "+91 98765 20071",
    emergencyContact: "+91 98765 20072 (Guardian)",
    preferredMode: "In-Person (Room 2B)",
    bio: "Interested in mentoring conversations around academic performance and growth.",
  },
  {
    username: "student11",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Aditi Khanna",
    email: "aditi.khanna@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-011",
    semester: "Semester 3",
    mentor: "Mr. Dilip Menariya",
    gpa: 7.8,
    attendance: 86,
    phone: "+91 98765 20081",
    emergencyContact: "+91 98765 20082 (Guardian)",
    preferredMode: "Virtual Video Call",
    bio: "Seeks support with academic strategy, peer collaboration, and mental wellbeing.",
  },
  {
    username: "student12",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Yash Malhotra",
    email: "yash.malhotra@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-012",
    semester: "Semester 1",
    mentor: "Ms. Yukti Tiwari",
    gpa: 6.9,
    attendance: 75,
    phone: "+91 98765 20091",
    emergencyContact: "+91 98765 20092 (Guardian)",
    preferredMode: "Hybrid / Flexible",
    bio: "Transitioning into university life and seeking first-year mentoring support.",
  },
  {
    username: "student13",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Saanvi Kulkarni",
    email: "saanvi.kulkarni@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-013",
    semester: "Semester 2",
    mentor: "Ms. Yukti Tiwari",
    gpa: 7.3,
    attendance: 81,
    phone: "+91 98765 20101",
    emergencyContact: "+91 98765 20102 (Guardian)",
    preferredMode: "Virtual Video Call",
    bio: "Needs coaching for programming fundamentals and study habits.",
  },
  {
    username: "student14",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Arnav Shah",
    email: "arnav.shah@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-014",
    semester: "Semester 3",
    mentor: "Ms. Yukti Tiwari",
    gpa: 7.7,
    attendance: 85,
    phone: "+91 98765 20111",
    emergencyContact: "+91 98765 20112 (Guardian)",
    preferredMode: "In-Person (Room 2B)",
    bio: "Learning to plan coursework and build better academic routines.",
  },
  {
    username: "student15",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Tanvi Desai",
    email: "tanvi.desai@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-015",
    semester: "Semester 2",
    mentor: "Ms. Yukti Tiwari",
    gpa: 7.1,
    attendance: 79,
    phone: "+91 98765 20121",
    emergencyContact: "+91 98765 20122 (Guardian)",
    preferredMode: "Hybrid / Flexible",
    bio: "Looking for mentoring around lab performance and confidence-building.",
  },
  {
    username: "student16",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Kunal Gupta",
    email: "kunal.gupta@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-016",
    semester: "Semester 1",
    mentor: "Ms. Yukti Tiwari",
    gpa: 6.7,
    attendance: 72,
    phone: "+91 98765 20131",
    emergencyContact: "+91 98765 20132 (Guardian)",
    preferredMode: "Hybrid / Flexible",
    bio: "Needs support with study planning, time management, and course transition.",
  },
  {
    username: "student17",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Nisha Reddy",
    email: "nisha.reddy@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-017",
    semester: "Semester 4",
    mentor: "Ms. Yukti Tiwari",
    gpa: 8.2,
    attendance: 91,
    phone: "+91 98765 20141",
    emergencyContact: "+91 98765 20142 (Guardian)",
    preferredMode: "Virtual Video Call",
    bio: "Interested in structured mentoring for better academic consistency.",
  },
  {
    username: "student18",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Rohan Batra",
    email: "rohan.batra@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-018",
    semester: "Semester 2",
    mentor: "Ms. Yukti Tiwari",
    gpa: 7.6,
    attendance: 83,
    phone: "+91 98765 20151",
    emergencyContact: "+91 98765 20152 (Guardian)",
    preferredMode: "In-Person (Room 2B)",
    bio: "Seeking mentoring for academic planning and engineering portfolio growth.",
  },
  {
    username: "student19",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Suhani Chawla",
    email: "suhani.chawla@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-019",
    semester: "Semester 5",
    mentor: "Ms. Yukti Tiwari",
    gpa: 8.5,
    attendance: 94,
    phone: "+91 98765 20161",
    emergencyContact: "+91 98765 20162 (Guardian)",
    preferredMode: "Virtual Video Call",
    bio: "Interested in mentoring conversations around projects and future planning.",
  },
  {
    username: "student20",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Aditya Banerjee",
    email: "aditya.banerjee@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-020",
    semester: "Semester 3",
    mentor: "Ms. Yukti Tiwari",
    gpa: 7.9,
    attendance: 87,
    phone: "+91 98765 20171",
    emergencyContact: "+91 98765 20172 (Guardian)",
    preferredMode: "Hybrid / Flexible",
    bio: "Working with mentor support on academics and confidence in technical courses.",
  },
  {
    username: "cse001",
    password: "EMP001",
    role: "teacher",
    fullName: "Mr. Dilip Menariya",
    email: "dilip.menariya.cse@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE001",
    phone: "+91 98765 11223",
    designation: "Associate Professor",
    office: "Room 2B, CSE Faculty Wing",
    specialization: "Algorithms, academic advising, and student wellbeing",
    bio: "Faculty mentor supporting students with academic planning and counselling.",
  },
  {
    username: "cse002",
    password: "EMP002",
    role: "teacher",
    fullName: "Ms. Yukti Tiwari",
    email: "yukti.tiwari.cse@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE002",
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
    fullName: "Mr. B.L. Pal",
    email: "hod.cse@campuscare.edu",
    department: DEPARTMENT,
    identifier: "HOD-CSE-001",
    designation: "Professor & Head of Department",
    office: "Room 101, Administrative Block",
    phone: "+91 98765 22334",
  },
  {
    username: "demo-student",
    password: DEMO_PASSWORD,
    role: "student",
    fullName: "Demo Student",
    email: "demo.student@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-2026-DEMO",
    isDemo: true,
    phone: "+91 90000 00001",
    bio: "Demo-only student workflow preview for role structure and counselling flow.",
  },
  {
    username: "demo-teacher",
    password: DEMO_PASSWORD,
    role: "teacher",
    fullName: "Demo Teacher",
    email: "demo.teacher@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-DEMO-TEACHER",
    isDemo: true,
    designation: "Demo Faculty",
    office: "Demo Hall",
    specialization: "Demo mentoring workflow",
    bio: "Demo-only teacher workflow preview for student oversight and mentoring.",
  },
  {
    username: "demo-hod",
    password: DEMO_PASSWORD,
    role: "hod",
    fullName: "Demo HOD",
    email: "demo.hod@campuscare.edu",
    department: DEPARTMENT,
    identifier: "HOD-CSE-DEMO",
    isDemo: true,
    designation: "Demo Department Head",
    office: "Demo Office",
    bio: "Demo-only HOD workflow preview for department oversight and mentoring.",
  },
];

const DEMO_USERNAMES = initialUsers
  .filter(({ role }) => role !== "admin")
  .map(({ username }) => username);

function formatDate(offsetDays) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

export async function seedDatabase() {
  const allowedUsernames = initialUsers.map((u) => u.username.toLowerCase());
  await User.deleteMany({ username: { $nin: allowedUsernames } });
  console.log("Checking database demo accounts...");
  for (const userData of initialUsers) {
    const lowerUsername = userData.username.toLowerCase();
    const existingUser = await User.findOne({ username: lowerUsername });
    if (existingUser) {
      // Always sync name, email, and profile fields for teachers, HODs, and admins
      if (["teacher", "hod", "admin"].includes(existingUser.role)) {
        existingUser.fullName = userData.fullName;
        existingUser.email = userData.email;
        existingUser.isDemo = Boolean(userData.isDemo);
        if (userData.designation) existingUser.designation = userData.designation;
        if (userData.office) existingUser.office = userData.office;
        if (userData.phone) existingUser.phone = userData.phone;
        if (userData.identifier) existingUser.identifier = userData.identifier;
        await existingUser.save();
      }
      continue;
    }

    // Store username in lowercase for consistent login matching
    await User.create({ ...userData, username: lowerUsername });
    console.log(
      `Created [${userData.role.toUpperCase()}] demo user: username='${userData.username}'`
    );
  }

  // Update legacy teacher names across student mentors, appointments, and tasks
  await Promise.all([
    User.updateMany(
      { mentor: { $in: ["Dr. Priya Nair", "Prof. Priya Nair", "Mr.Dilp Menariya"] } },
      { $set: { mentor: "Mr. Dilip Menariya" } }
    ),
    User.updateMany(
      { mentor: "Prof. Arjun Mehta" },
      { $set: { mentor: "Ms. Yukti Tiwari" } }
    ),
    Appointment.updateMany(
      { counsellorName: { $in: ["Dr. Priya Nair", "Prof. Priya Nair", "Mr.Dilp Menariya"] } },
      { $set: { counsellorName: "Mr. Dilip Menariya" } }
    ),
    Appointment.updateMany(
      { counsellorName: "Prof. Arjun Mehta" },
      { $set: { counsellorName: "Ms. Yukti Tiwari" } }
    ),
    Task.updateMany(
      { assignedBy: { $in: ["Dr. Priya Nair", "Prof. Priya Nair", "Mr.Dilp Menariya"] } },
      { $set: { assignedBy: "Mr. Dilip Menariya" } }
    ),
    Task.updateMany(
      { assignedBy: "Prof. Arjun Mehta" },
      { $set: { assignedBy: "Ms. Yukti Tiwari" } }
    ),
  ]);

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
  await User.deleteMany({ username: { $in: ["admin", "ccadmin", "CCadmin"] } });

  const users = await User.create(initialUsers);
  const byUsername = new Map(users.map((user) => [user.username, user]));
  const students = users.filter((user) => user.role === "student");
  const teachers = users.filter((user) => user.role === "teacher");
  const mentorAssignments = [
    ["student", "teacher"],
    ["student2", "teacher"],
    ["student4", "teacher"],
    ["student5", "teacher"],
    ["student6", "teacher"],
    ["student7", "teacher"],
    ["student8", "teacher"],
    ["student9", "teacher"],
    ["student10", "teacher"],
    ["student11", "teacher"],
    ["student3", "teacher2"],
    ["student12", "teacher2"],
    ["student13", "teacher2"],
    ["student14", "teacher2"],
    ["student15", "teacher2"],
    ["student16", "teacher2"],
    ["student17", "teacher2"],
    ["student18", "teacher2"],
    ["student19", "teacher2"],
    ["student20", "teacher2"],
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
