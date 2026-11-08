/**
 * Migration script: keep the seeded demo accounts aligned with the demo-only workflow.
 * Real user identifiers are intentionally not used anywhere in the project.
 * Run from server/ directory: node seed/migrateAccounts.js
 */
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";

const DEPARTMENT = "Computer Science & Engineering";

async function run() {
  await connectDB();
  console.log("Connected to DB. Running account migration...\n");

  // ── 1. Keep a single demo HOD account aligned with the demo workflow ─────
  const hodDemo = await User.findOne({ username: "demo-hod" });
  if (hodDemo) {
    hodDemo.fullName = "Demo HOD";
    hodDemo.identifier = "HOD-CSE-DEMO";
    hodDemo.designation = "Demo Department Head";
    hodDemo.office = "Demo Office";
    await hodDemo.save();
    console.log("✅  demo-hod → normalized to the single demo HOD profile");
  } else {
    console.log("⚠️  demo-hod account not found — skipping");
  }

  // ── 2. Keep a single demo teacher account ─────────────────────────────────
  const teacherDemo = {
    username: "demo-teacher",
    password: "password123",
    role: "teacher",
    fullName: "Demo Teacher",
    email: "demo.teacher@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-DEMO-TEACHER",
    phone: "+91 90000 00002",
    designation: "Demo Faculty",
    office: "Demo Hall",
    specialization: "Demo mentoring workflow",
    bio: "Demo-only teacher workflow preview for student oversight and mentoring.",
  };
  const existingTeacher = await User.findOne({ username: "demo-teacher" });
  if (existingTeacher) {
    Object.assign(existingTeacher, { ...teacherDemo, password: undefined });
    await existingTeacher.save();
    console.log("✅  demo-teacher → updated");
  } else {
    await User.create(teacherDemo);
    console.log("✅  demo-teacher → created");
  }

  // ── 3. Remove duplicate demo accounts and legacy usernames ────────────────
  const staleCount = await User.deleteMany({
    username: {
      $in: [
        "teacher-demo-1",
        "teacher-demo-2",
        "hod-demo",
        "teacher",
        "teacher2",
        "hod",
        "demo-teacher-legacy",
        "demo-hod-legacy",
        "legacy-teacher-1",
        "legacy-teacher-2",
        "legacy-hod-demo",
      ],
    },
  });
  if (staleCount.deletedCount > 0) {
    console.log(`🗑️   Removed ${staleCount.deletedCount} duplicate or legacy demo account(s)`);
  }

  // ── 6. Print final account list ─────────────────────────────────────────────
  console.log("\n── Final accounts in DB ──────────────────────────────────────");
  const all = await User.find({}).select("username fullName role identifier").lean();
  for (const u of all) {
    console.log(`  [${u.role.toUpperCase().padEnd(7)}] ${u.username.padEnd(20)} ${u.fullName}`);
  }

  await mongoose.disconnect();
  console.log("\nMigration complete.");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exitCode = 1;
});

