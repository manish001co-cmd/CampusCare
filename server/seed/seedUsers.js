import "dotenv/config";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";

export const initialUsers = [
  {
    username: "student",
    password: "password123",
    role: "student",
    fullName: "Manish Kumar",
    email: "aarav.sharma@campuscare.edu",
    department: "Computer Science & Engineering",
    identifier: "CS2026-084",
  },
  {
    username: "teacher",
    password: "password123",
    role: "teacher",
    fullName: "Mr. Dilip Menariya",
    email: "priya.nair@campuscare.edu",
    department: "Computer Science & Engineering",
    identifier: "FAC-CS-104",
  },
  {
    username: "hod",
    password: "password123",
    role: "hod",
    fullName: "Dr. Rajesh Kulkarni",
    email: "hod.cse@campuscare.edu",
    department: "Computer Science & Engineering",
    identifier: "HOD-CSE-001",
  },
  {
    username: "admin",
    password: "password123",
    role: "admin",
    fullName: "System Administrator",
    email: "admin@campuscare.edu",
    department: "Campus Administration",
    identifier: "ADMIN-001",
  },
];

export async function seedDatabase() {
  try {
    console.log("Checking database users...");
    const count = await User.countDocuments();
    if (count > 0) {
      console.log(`Database already has ${count} users. Seeding skipped.`);
      return;
    }

    console.log("Database is empty. Seeding default role-based users...");
    for (const userData of initialUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`Created [${userData.role.toUpperCase()}] user: username='${userData.username}'`);
    }

    console.log("Database seeded successfully with all 4 roles!");
  } catch (error) {
    console.error("Error seeding database:", error.message);
  }
}

// Allow direct execution: `node seed/seedUsers.js`
if (process.argv[1]?.endsWith("seedUsers.js")) {
  (async () => {
    try {
      await connectDB();
      // Drop existing users and recreate for clean seed
      console.log("Resetting users collection...");
      await User.deleteMany({});
      for (const userData of initialUsers) {
        const user = new User(userData);
        await user.save();
        console.log(`Created [${userData.role.toUpperCase()}] user: username='${userData.username}'`);
      }
      console.log("Database reset and seeded successfully!");
      process.exit(0);
    } catch (err) {
      console.error("Seeding failed:", err);
      process.exit(1);
    }
  })();
}
