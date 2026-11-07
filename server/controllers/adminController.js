import { Appointment } from "../models/Appointment.js";
import { Task } from "../models/Task.js";
import { User } from "../models/User.js";
import mongoose from "mongoose";

const ACCOUNT_ROLES = ["student", "teacher", "hod", "admin"];

export async function getAdminDashboard(req, res) {
  try {
    const [users, appointmentCount, completedSessions] = await Promise.all([
      User.find({ isDemo: { $ne: true } })
        .select(
          "username role fullName email department identifier phone bio designation office specialization createdAt"
        )
        .sort({ createdAt: -1 })
        .lean(),
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: "Completed" }),
    ]);

    const roleCounts = {
      student: 0,
      teacher: 0,
      hod: 0,
      admin: 0,
    };

    for (const user of users) {
      roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
    }

    return res.json({
      success: true,
      profile: {
        fullName: req.user.fullName,
        email: req.user.email,
        identifier: req.user.identifier,
        phone: req.user.phone || "",
        bio: req.user.bio || "",
      },
      summary: {
        totalAccounts: users.length,
        studentCount: roleCounts.student,
        teacherCount: roleCounts.teacher,
        facultyCount: roleCounts.teacher,
        hodCount: roleCounts.hod,
        adminCount: roleCounts.admin,
        appointmentCount,
        completedSessions,
      },
      departments: [],
      users: users.map((user) => ({
        id: user._id,
        username: user.username,
        role: user.role,
        fullName: user.fullName,
        email: user.email || "",
        department: user.department || "",
        identifier: user.identifier || "",
        phone: user.phone || "",
        bio: user.bio || "",
        designation: user.designation || "",
        office: user.office || "",
        specialization: user.specialization || "",
        createdAt: user.createdAt,
      })),
    });
  } catch (error) {
    console.error("Admin dashboard data error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching system administration data.",
    });
  }
}

export async function createAccount(req, res) {
  try {
    const { username, password, role, fullName, email, department, identifier } =
      req.body;

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof fullName !== "string" ||
      typeof role !== "string" ||
      typeof department !== "string" ||
      !username.trim() ||
      !password ||
      !fullName.trim() ||
      !department.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Username, password, full name, role, and department are required.",
      });
    }

    const normalizedRole = role.trim().toLowerCase();
    if (!ACCOUNT_ROLES.includes(normalizedRole)) {
      return res.status(400).json({
        success: false,
        message: "Select a valid account role.",
      });
    }
    if (username.trim().length < 3) {
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

    const normalizedUsername = username.trim().toLowerCase();
    const existingUser = await User.findOne({ username: normalizedUsername })
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
      role: normalizedRole,
      fullName: fullName.trim(),
      email: typeof email === "string" ? email.trim() : "",
      department: department.trim(),
      identifier:
        typeof identifier === "string" ? identifier.trim() : undefined,
      phone: typeof req.body.phone === "string" ? req.body.phone.trim() : "",
      bio: typeof req.body.bio === "string" ? req.body.bio.trim() : "",
      designation:
        typeof req.body.designation === "string"
          ? req.body.designation.trim()
          : "",
      office:
        typeof req.body.office === "string" ? req.body.office.trim() : "",
      specialization:
        typeof req.body.specialization === "string"
          ? req.body.specialization.trim()
          : "",
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        fullName: user.fullName,
        email: user.email || "",
        department: user.department,
        identifier: user.identifier || "",
        phone: user.phone || "",
        bio: user.bio || "",
        designation: user.designation || "",
        office: user.office || "",
        specialization: user.specialization || "",
      },
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

    console.error("Account creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating account.",
    });
  }
}

export async function updateTeacher(req, res) {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "A valid account is required.",
      });
    }

    const body = req.body ?? {};
    const allowedFields = [
      "username",
      "password",
      "fullName",
      "email",
      "department",
      "identifier",
      "phone",
      "bio",
      "designation",
      "office",
      "specialization",
      "emergencyContact",
      "preferredMode",
    ];
    const updates = {};

    for (const field of allowedFields) {
      if (!Object.hasOwn(body, field)) continue;
      if (typeof body[field] !== "string") {
        return res.status(400).json({
          success: false,
          message: `${field} must be a string.`,
        });
      }
      const value = body[field].trim();
      if (field === "username") {
        if (!value || value.length < 3) {
          return res.status(400).json({
            success: false,
            message: "Username must be at least 3 characters long.",
          });
        }
        updates.username = value.toLowerCase();
        continue;
      }
      if (field === "password") {
        if (!value || value.length < 4) {
          return res.status(400).json({
            success: false,
            message: "Password must be at least 4 characters long.",
          });
        }
        updates.password = value;
        continue;
      }
      if (field === "fullName" && !value) {
        return res.status(400).json({
          success: false,
          message: "Full name cannot be empty.",
        });
      }
      if (field === "department" && !value) {
        return res.status(400).json({
          success: false,
          message: "Department cannot be empty.",
        });
      }
      updates[field] = value;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one account detail to update.",
      });
    }

    const currentUser = await User.findById(userId).select("_id role fullName username");
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    const previousFullName = currentUser.fullName;

    if (updates.username && updates.username !== currentUser.username) {
      const usernameTaken = await User.findOne({
        username: updates.username,
        _id: { $ne: userId },
      }).select("_id").lean();
      if (usernameTaken) {
        return res.status(409).json({
          success: false,
          message: "That username is already in use.",
        });
      }
    }

    if (updates.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address.",
      });
    }

    Object.assign(currentUser, updates);
    await currentUser.save();

    if (
      currentUser.role === "teacher" &&
      updates.fullName &&
      updates.fullName !== previousFullName
    ) {
      await Promise.all([
        User.updateMany(
          {
            role: "student",
            mentor: previousFullName,
            mentorId: null,
          },
          { $set: { mentor: updates.fullName } }
        ),
        Appointment.updateMany(
          { counsellorName: previousFullName },
          { $set: { counsellorName: updates.fullName } }
        ),
        Task.updateMany(
          {
            assignedBy: previousFullName,
            assignedById: null,
          },
          { $set: { assignedBy: updates.fullName } }
        ),
      ]);
    }

    return res.json({
      success: true,
      message: `${currentUser.role === "hod" ? "HOD" : currentUser.role === "admin" ? "Admin" : currentUser.role[0].toUpperCase() + currentUser.role.slice(1)} information updated successfully.`,
      user: {
        id: currentUser._id,
        username: currentUser.username,
        role: currentUser.role,
        fullName: currentUser.fullName,
        email: currentUser.email || "",
        department: currentUser.department || "",
        identifier: currentUser.identifier || "",
        phone: currentUser.phone || "",
        bio: currentUser.bio || "",
        designation: currentUser.designation || "",
        office: currentUser.office || "",
        specialization: currentUser.specialization || "",
      },
    });
  } catch (error) {
    console.error("Account update error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating account information.",
    });
  }
}

export async function deleteAccount(req, res) {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "A valid account is required.",
      });
    }

    const account = await User.findOne({
      _id: userId,
      role: { $in: ["student", "teacher", "hod"] },
    }).select("_id role fullName");

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Student, teacher, or HOD account not found.",
      });
    }

    if (account.role === "student") {
      await Promise.all([
        Appointment.deleteMany({ studentId: account._id }),
        Task.deleteMany({ studentId: account._id }),
      ]);
    } else if (account.role === "teacher") {
      await User.updateMany(
        {
          role: "student",
          $or: [
            { mentorId: account._id },
            { mentor: account.fullName, mentorId: null },
          ],
        },
        { $unset: { mentorId: 1 }, $set: { mentor: "" } }
      );
    }
    await account.deleteOne();

    return res.json({
      success: true,
      message: `${account.role === "hod" ? "HOD" : account.role} account deleted successfully.`,
    });
  } catch (error) {
    console.error("Account deletion error:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting account.",
    });
  }
}
