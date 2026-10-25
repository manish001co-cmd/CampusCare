import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: ["student", "teacher", "hod", "admin"],
        message: "{VALUE} is not a valid role",
      },
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    department: {
      type: String,
      default: "General",
      trim: true,
    },
    identifier: {
      type: String, // Roll number or Employee ID
      trim: true,
    },
    phone: {
      type: String,
      default: "+91 98765 43210",
      trim: true,
    },
    emergencyContact: {
      type: String,
      default: "+91 98765 01234 (Guardian)",
      trim: true,
    },
    preferredMode: {
      type: String,
      default: "In-Person (Room 2B)",
      trim: true,
    },
    bio: {
      type: String,
      default: "Computer Science undergraduate interested in AI systems and wellness.",
      trim: true,
    },
    semester: {
      type: String,
      default: "Semester 5 (Year 3)",
      trim: true,
    },
    mentor: {
      type: String,
      default: "Mr. Dilip Menariya",
      trim: true,
    },
    gpa: {
      type: Number,
      default: 8.6,
    },
    attendance: {
      type: Number,
      default: 92,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password helper
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
