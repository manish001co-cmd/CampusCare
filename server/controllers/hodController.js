import mongoose from "mongoose";
import { User } from "../models/User.js";
import { Appointment } from "../models/Appointment.js";

const ATTENDANCE_RISK_THRESHOLD = 85;
const GPA_RISK_THRESHOLD = 7;

function getStudentRiskReasons(student) {
  const reasons = [];
  if (
    Number.isFinite(student.attendance) &&
    student.attendance < ATTENDANCE_RISK_THRESHOLD
  ) {
    reasons.push(`Attendance below ${ATTENDANCE_RISK_THRESHOLD}%`);
  }
  if (Number.isFinite(student.gpa) && student.gpa < GPA_RISK_THRESHOLD) {
    reasons.push(`GPA below ${GPA_RISK_THRESHOLD}`);
  }
  return reasons;
}

export async function getHodDashboard(req, res) {
  try {
    const department = req.user.department;
    if (!department) {
      return res.status(403).json({
        success: false,
        message: "Your account is not assigned to a department.",
      });
    }

    const [students, faculty] = await Promise.all([
      User.find({ role: "student", department })
        .select("fullName username identifier attendance gpa mentor")
        .sort({ fullName: 1 }),
      User.find({ role: "teacher", department })
        .select("fullName username email identifier")
        .sort({ fullName: 1 })
        .lean(),
    ]);

    const studentIds = students.map((student) => student._id);
    const appointments = studentIds.length
      ? await Appointment.find({ studentId: { $in: studentIds } })
          .select("studentId counsellorName type title date time location status")
          .sort({ date: -1, createdAt: -1 })
          .lean()
      : [];
    const studentById = new Map(
      students.map((student) => [student._id.toString(), student])
    );

    const studentsAtRisk = students
      .map((student) => ({
        id: student._id,
        fullName: student.fullName,
        username: student.username,
        identifier: student.identifier,
        attendance: student.attendance,
        gpa: student.gpa,
        mentor: student.mentor || "",
        riskReasons: getStudentRiskReasons(student),
      }))
      .filter((student) => student.riskReasons.length > 0);

    const appointmentTypes = {
      academic: 0,
      career: 0,
      personal: 0,
    };
    for (const appointment of appointments) {
      if (Object.hasOwn(appointmentTypes, appointment.type)) {
        appointmentTypes[appointment.type] += 1;
      }
    }

    const recordedAttendance = students
      .map((student) => student.attendance)
      .filter(Number.isFinite);
    const recordedGpa = students
      .map((student) => student.gpa)
      .filter(Number.isFinite);

    return res.json({
      success: true,
      profile: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        department,
        identifier: req.user.identifier,
        role: req.user.role,
      },
      summary: {
        studentCount: students.length,
        facultyCount: faculty.length,
        studentsAtRisk: studentsAtRisk.length,
        pendingAppointments: appointments.filter(
          (appointment) => appointment.status === "Pending"
        ).length,
        completedSessions: appointments.filter(
          (appointment) => appointment.status === "Completed"
        ).length,
        averageAttendance: recordedAttendance.length
          ? Math.round(
              recordedAttendance.reduce((total, value) => total + value, 0) /
                recordedAttendance.length
            )
          : null,
        averageGpa: recordedGpa.length
          ? Number(
              (
                recordedGpa.reduce((total, value) => total + value, 0) /
                recordedGpa.length
              ).toFixed(1)
            )
          : null,
        appointmentTypes,
      },
      faculty: faculty.map((member) => ({
        id: member._id,
        fullName: member.fullName,
        username: member.username,
        email: member.email || "",
        identifier: member.identifier || "",
      })),
      students: students.map((student) => ({
        id: student._id,
        fullName: student.fullName,
        username: student.username,
        identifier: student.identifier,
        attendance: student.attendance,
        gpa: student.gpa,
        mentor: student.mentor || "",
        riskReasons: getStudentRiskReasons(student),
      })),
      studentsAtRisk,
      appointments: appointments.map((appointment) => {
        const student = studentById.get(appointment.studentId.toString());
        return {
          id: appointment._id,
          studentName: student?.fullName || "Student",
          studentIdentifier: student?.identifier || "",
          counsellorName: appointment.counsellorName,
          type: appointment.type,
          title: appointment.title,
          date: appointment.date,
          time: appointment.time,
          location: appointment.location,
          status: appointment.status,
        };
      }),
    });
  } catch (error) {
    console.error("HOD dashboard data error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching department dashboard",
    });
  }
}

export async function assignStudentMentor(req, res) {
  try {
    const { studentId } = req.params;
    const { facultyId } = req.body;

    if (!req.user.department) {
      return res.status(403).json({
        success: false,
        message: "Your account is not assigned to a department.",
      });
    }

    if (
      !mongoose.isValidObjectId(studentId) ||
      !mongoose.isValidObjectId(facultyId)
    ) {
      return res.status(400).json({
        success: false,
        message: "A valid student and faculty member are required.",
      });
    }

    const [student, faculty] = await Promise.all([
      User.findOne({
        _id: studentId,
        role: "student",
        department: req.user.department,
      }),
      User.findOne({
        _id: facultyId,
        role: "teacher",
        department: req.user.department,
      }).select("fullName"),
    ]);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found in your department.",
      });
    }
    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty member not found in your department.",
      });
    }

    student.mentor = faculty.fullName;
    student.mentorId = faculty._id;
    await student.save();

    return res.json({
      success: true,
      message: "Faculty mentor assigned successfully.",
      studentId: student._id,
      mentor: student.mentor,
    });
  } catch (error) {
    console.error("Student mentor assignment error:", error);
    return res.status(500).json({
      success: false,
      message: "Error assigning faculty mentor.",
    });
  }
}
