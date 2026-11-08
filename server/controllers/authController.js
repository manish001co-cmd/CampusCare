import jwt from "jsonwebtoken";
import { Appointment } from "../models/Appointment.js";
import { Task } from "../models/Task.js";
import { User } from "../models/User.js";

// Generate JWT token
function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET || "campuscare_super_secret_jwt_key_2026",
    {
      expiresIn: "7d",
    }
  );
}

function serializeUser(user) {
  return {
    id: user._id,
    username: user.username,
    fullName: user.fullName,
    role: user.role,
    email: user.email || "",
    department: user.department || "",
    identifier: user.identifier || "",
    phone: user.phone || "",
    bio: user.bio || "",
    office: user.office || "",
    designation: user.designation || "",
    specialization: user.specialization || "",
    emergencyContact: user.emergencyContact || "",
    preferredMode: user.preferredMode || "",
  };
}

// POST /api/auth/login
export async function login(req, res) {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter both username and password.",
      });
    }

    const cleanUsername = username.trim().toLowerCase();

    // Find user by username (support both 'admin' and 'ccadmin' for admin role)
    let user = await User.findOne({ username: cleanUsername });
    if (!user && (cleanUsername === "ccadmin" || cleanUsername === "admin")) {
      user = await User.findOne({
        username: cleanUsername === "admin" ? "ccadmin" : "admin",
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    // Verify password (for admin, accept password123 or CC123)
    let isMatch = await user.comparePassword(password);
    if (!isMatch && user.role === "admin") {
      if (password === "password123" || password === "CC123") {
        isMatch = true;
      }
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    // Verify role if selected
    if (role && role.toLowerCase() !== user.role.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: `Role mismatch: This account is registered as '${user.role.toUpperCase()}', but '${role.toUpperCase()}' was selected.`,
      });
    }

    // Generate token
    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: serializeUser(user),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login. Please try again later.",
      error: error.message,
    });
  }
}

// POST /api/auth/register
export async function registerStudent(req, res) {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Student accounts can only be created by an administrator.",
      });
    }

    const { username, password, fullName, email, department, identifier } =
      req.body;

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof fullName !== "string" ||
      typeof department !== "string" ||
      !username.trim() ||
      !password ||
      !fullName.trim() ||
      !department.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, username, password, and department are required.",
      });
    }

    const normalizedUsername = username.trim().toLowerCase();
    if (normalizedUsername.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters long.",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";
    if (
      normalizedEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address.",
      });
    }

    const existingUser = await User.findOne({
      username: normalizedUsername,
    })
      .select("_id")
      .lean();
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "That username is already in use.",
      });
    }

    const user = await User.create({
      username: normalizedUsername,
      password,
      fullName: fullName.trim(),
      role: "student",
      email: normalizedEmail,
      department: department.trim(),
      identifier:
        typeof identifier === "string" && identifier.trim()
          ? identifier.trim()
          : undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Student account created successfully.",
      token: generateToken(user),
      user: serializeUser(user),
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "That username is already in use.",
      });
    }
    if (error?.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Student registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to create your account right now. Please try again.",
    });
  }
}

// GET /api/auth/me
export async function getMe(req, res) {
  try {
    return res.status(200).json({
      success: true,
      user: serializeUser(req.user),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

// PUT /api/auth/profile
export async function updateMyProfile(req, res) {
  try {
    const allowedFields = [
      "fullName",
      "email",
      "phone",
      "emergencyContact",
      "preferredMode",
      "bio",
      "department",
      "office",
      "designation",
      "specialization",
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

    if (Object.hasOwn(updates, "fullName") && !updates.fullName) {
      return res.status(400).json({
        success: false,
        message: "Full name cannot be empty.",
      });
    }

    const previousFullName = req.user.fullName;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    // If teacher updated their full name, sync it across mentor fields
    if (
      updatedUser.role === "teacher" &&
      updates.fullName &&
      updates.fullName !== previousFullName
    ) {
      await Promise.all([
        User.updateMany(
          { mentor: previousFullName },
          { $set: { mentor: updates.fullName } }
        ),
        Appointment.updateMany(
          { counsellorName: previousFullName },
          { $set: { counsellorName: updates.fullName } }
        ),
        Task.updateMany(
          { assignedBy: previousFullName },
          { $set: { assignedBy: updates.fullName } }
        ),
      ]);
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: serializeUser(updatedUser),
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update profile. Please try again.",
      error: error.message,
    });
  }
}
