import jwt from "jsonwebtoken";
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

    // Find user by username
    const user = await User.findOne({ username: cleanUsername });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
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
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        email: user.email,
        department: user.department,
        identifier: user.identifier,
      },
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

// GET /api/auth/me
export async function getMe(req, res) {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
