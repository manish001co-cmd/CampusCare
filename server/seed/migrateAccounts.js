/**
 * Migration script: update accounts per user request
 *   - HOD demo (hod/password123): rename to Mr. B.L. Pal
 *   - New teacher: cse001 / EMP001 (Mr. Dilip Menariya)
 *   - New teacher: cse002 / EMP002 (Ms. Yukti Tiwari)
 *   - New HOD: hod-cse-001 / EMP000 (Mr. B.L. Pal)
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

  // ── 1. Update demo HOD (hod) name to Mr. B.L. Pal ─────────────────────────
  const hodDemo = await User.findOne({ username: "hod" });
  if (hodDemo) {
    hodDemo.fullName = "Mr. B.L. Pal";
    hodDemo.identifier = "HOD-CSE-001";
    hodDemo.designation = "Professor & Head of Department";
    hodDemo.office = "Room 101, Administrative Block";
    await hodDemo.save();
    console.log("✅  hod (demo) → fullName updated to Mr. B.L. Pal");
  } else {
    console.log("⚠️  hod (demo) account not found — skipping");
  }

  // ── 2. Create / update CSE001 teacher (Mr. Dilip Menariya) ─────────────────
  const cse001Data = {
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
  };
  const existingCSE001 = await User.findOne({ username: "cse001" });
  if (existingCSE001) {
    Object.assign(existingCSE001, { ...cse001Data, password: undefined });
    await existingCSE001.save();
    console.log("✅  cse001 teacher → updated");
  } else {
    await User.create(cse001Data);
    console.log("✅  cse001 teacher → created (Mr. Dilip Menariya / EMP001)");
  }

  // ── 3. Create / update CSE002 teacher (Ms. Yukti Tiwari) ───────────────────
  const cse002Data = {
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
  };
  const existingCSE002 = await User.findOne({ username: "cse002" });
  if (existingCSE002) {
    Object.assign(existingCSE002, { ...cse002Data, password: undefined });
    await existingCSE002.save();
    console.log("✅  cse002 teacher → updated");
  } else {
    await User.create(cse002Data);
    console.log("✅  cse002 teacher → created (Ms. Yukti Tiwari / EMP002)");
  }

  // ── 4. Keep the single HOD demo account in sync with the requested profile ─
  const hodDemoAccount = await User.findOne({ username: "hod" });
  if (hodDemoAccount) {
    hodDemoAccount.fullName = "Mr. B.L. Pal";
    hodDemoAccount.email = "hod.cse@campuscare.edu";
    hodDemoAccount.department = DEPARTMENT;
    hodDemoAccount.identifier = "HOD-CSE-001";
    hodDemoAccount.designation = "Professor & Head of Department";
    hodDemoAccount.office = "Room 101, Administrative Block";
    hodDemoAccount.phone = "+91 98765 22334";
    await hodDemoAccount.save();
    console.log("✅  hod account → kept as the single HOD record");
  }

  // ── 5. Remove any stale old-uppercase teacher usernames if present ──────────
  const staleCount = await User.deleteMany({ username: { $in: ["CSE001", "CSE002", "HOD-CSE-001", "hod-cse-001", "teacher", "teacher2"] } });
  if (staleCount.deletedCount > 0) {
    console.log(`🗑️   Removed ${staleCount.deletedCount} stale uppercase teacher account(s)`);
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

