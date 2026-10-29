import { Appointment } from "../models/Appointment.js";
import { Task } from "../models/Task.js";
import { User } from "../models/User.js";
import mongoose from "mongoose";

const ACCOUNT_ROLES = ["student", "teacher", "hod", "admin"];

export async function getAdminDashboard(req, res) {
  try {
    const [users, appointmentCount, completedSessions] = await Promise.all([
      User.find({})
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
    const departments = new Map();

    for (const user of users) {
      roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
      if (!user.department || user.role === "admin") continue;

      const current = departments.get(user.department) || {
        name: user.department,
        students: 0,
        faculty: 0,
        hods: 0,
      };
      if (user.role === "student") current.students += 1;
      if (user.role === "teacher") current.faculty += 1;
      if (user.role === "hod") current.hods += 1;
      departments.set(user.department, current);
    }

    const departmentList = [...departments.values()].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return res.json({
      success: true,
      profile: {
        fullName: req.user.fullName,
        email: req.user.email,
        identifier: req.user.identifier,
      },
      summary: {
        totalAccounts: users.length,
        totalDepartments: departmentList.length,
        studentCount: roleCounts.student,
        teacherCount: roleCounts.teacher,
        facultyCount: roleCounts.teacher,
        hodCount: roleCounts.hod,
        adminCount: roleCounts.admin,
        appointmentCount,
        completedSessions,
      },
      departments: departmentList,
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
        message: "A valid teacher account is required.",
      });
    }

    const body = req.body ?? {};
    const allowedFields = [
      "fullName",
      "email",
      "department",
      "identifier",
      "phone",
      "bio",
      "designation",
      "office",
      "specialization",
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
      updates[field] = body[field].trim();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one teacher detail to update.",
      });
    }
    if (
      (Object.hasOwn(updates, "fullName") && !updates.fullName) ||
      (Object.hasOwn(updates, "department") && !updates.department)
    ) {
      return res.status(400).json({
        success: false,
        message: "Teacher name and department cannot be empty.",
      });
    }
    if (
      updates.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email)
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid teacher email address.",
      });
    }

    const currentTeacher = await User.findOne({
      _id: userId,
      role: "teacher",
    })
      .select("fullName")
      .lean();
    if (!currentTeacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher account not found.",
      });
    }

    const teacher = await User.findOneAndUpdate(
      { _id: userId, role: "teacher" },
      { $set: updates },
      { new: true, runValidators: true }
    ).select("username role fullName email department identifier");

    if (
      updates.fullName &&
      updates.fullName !== currentTeacher.fullName
    ) {
      await Promise.all([
        User.updateMany(
          {
            role: "student",
            mentor: currentTeacher.fullName,
            mentorId: null,
          },
          { $set: { mentor: updates.fullName } }
        ),
        Appointment.updateMany(
          { counsellorName: currentTeacher.fullName },
          { $set: { counsellorName: updates.fullName } }
        ),
        Task.updateMany(
          {
            assignedBy: currentTeacher.fullName,
            assignedById: null,
          },
          { $set: { assignedBy: updates.fullName } }
        ),
      ]);
    }

    return res.json({
      success: true,
      message: "Teacher information updated successfully.",
      user: {
        id: teacher._id,
        username: teacher.username,
        role: teacher.role,
        fullName: teacher.fullName,
        email: teacher.email || "",
        department: teacher.department || "",
        identifier: teacher.identifier || "",
        phone: teacher.phone || "",
        bio: teacher.bio || "",
        designation: teacher.designation || "",
        office: teacher.office || "",
        specialization: teacher.specialization || "",
      },
    });
  } catch (error) {
    console.error("Teacher information update error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating teacher information.",
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
