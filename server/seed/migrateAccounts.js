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

  // ── 1. Keep the demo HOD account aligned with the demo workflow ─────────
  const hodDemo = await User.findOne({ username: "hod-demo" });
  if (hodDemo) {
    hodDemo.fullName = "Demo HOD";
    hodDemo.identifier = "CSE-HOD-DEMO";
    hodDemo.designation = "Demo Department Head";
    hodDemo.office = "Demo Admin Block";
    await hodDemo.save();
    console.log("✅  hod-demo → normalized to demo-only values");
  } else {
    console.log("⚠️  hod-demo account not found — skipping");
  }

  // ── 2. Create / update demo teacher account 1 ─────────────────────────────
  const teacherDemoOne = {
    username: "teacher-demo-1",
    password: "password123",
    role: "teacher",
    fullName: "Demo Teacher One",
    email: "teacher1.demo@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-TEACHER-01",
    phone: "+91 90000 00011",
    designation: "Demo Faculty",
    office: "Demo Faculty Wing",
    specialization: "Demo mentoring and workflow preview",
    bio: "Demo-only teacher role preview for showcasing academic workflows.",
  };
  const existingTeacherOne = await User.findOne({ username: "teacher-demo-1" });
  if (existingTeacherOne) {
    Object.assign(existingTeacherOne, { ...teacherDemoOne, password: undefined });
    await existingTeacherOne.save();
    console.log("✅  teacher-demo-1 → updated");
  } else {
    await User.create(teacherDemoOne);
    console.log("✅  teacher-demo-1 → created");
  }

  // ── 3. Create / update demo teacher account 2 ─────────────────────────────
  const teacherDemoTwo = {
    username: "teacher-demo-2",
    password: "password123",
    role: "teacher",
    fullName: "Demo Teacher Two",
    email: "teacher2.demo@campuscare.edu",
    department: DEPARTMENT,
    identifier: "CSE-TEACHER-02",
    phone: "+91 90000 00012",
    designation: "Demo Faculty",
    office: "Demo Faculty Wing",
    specialization: "Demo mentoring and workflow preview",
    bio: "Demo-only teacher role preview for showcasing academic workflows.",
  };
  const existingTeacherTwo = await User.findOne({ username: "teacher-demo-2" });
  if (existingTeacherTwo) {
    Object.assign(existingTeacherTwo, { ...teacherDemoTwo, password: undefined });
    await existingTeacherTwo.save();
    console.log("✅  teacher-demo-2 → updated");
  } else {
    await User.create(teacherDemoTwo);
    console.log("✅  teacher-demo-2 → created");
  }

  // ── 4. Remove stale real-user identifiers and old usernames if present ─────
  const staleCount = await User.deleteMany({ username: { $in: ["legacy-teacher-1", "legacy-teacher-2", "legacy-hod-demo", "teacher-demo-legacy", "hod-demo-legacy"] } });
  if (staleCount.deletedCount > 0) {
    console.log(`🗑️   Removed ${staleCount.deletedCount} stale real-user or legacy account(s)`);
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

