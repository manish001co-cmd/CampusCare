import mongoose from "mongoose";
import { Appointment } from "../models/Appointment.js";
import { Task } from "../models/Task.js";
import { User } from "../models/User.js";

function isAssignedStudent(student, teacher) {
  const mentorId = student.mentorId?.toString();
  return (
    mentorId === teacher._id.toString() ||
    (!mentorId && student.mentor === teacher.fullName)
  );
}

function getAssignedStudentsQuery(teacher) {
  return {
    role: "student",
    ...(teacher.department ? { department: teacher.department } : {}),
    $or: [
      { mentorId: teacher._id },
      { mentor: teacher.fullName, mentorId: null },
    ],
  };
}

function serializeTask(task, student) {
  return {
    id: task._id,
    studentId: student?._id || task.studentId,
    studentName: student?.fullName || task.studentUsername,
    task: task.title,
    assignedDate: task.createdAt,
    dueDate: task.dueDate,
    status: task.completed ? "Completed" : "Pending",
    feedback: task.feedback || "",
    priority: task.priority,
  };
}

// GET /api/teacher/dashboard
export async function getTeacherDashboard(req, res) {
  try {
    const teacher = req.user;
    const students = await User.find(getAssignedStudentsQuery(teacher))
      .select(
        "fullName username identifier department semester attendance gpa mentorId mentor"
      )
      .sort({ fullName: 1 })
      .lean();
    const studentIds = students.map((student) => student._id);
    const appointmentQuery = {
      counsellorName: teacher.fullName,
      studentId: { $in: studentIds },
    };
    const taskQuery = studentIds.length
      ? {
          studentId: { $in: studentIds },
          $or: [
            { assignedById: teacher._id },
            {
              assignedBy: teacher.fullName,
              assignedById: null,
            },
          ],
        }
      : null;

    const [appointments, tasks] = await Promise.all([
      studentIds.length
        ? Appointment.find(appointmentQuery)
            .sort({ createdAt: -1 })
            .lean()
        : [],
      taskQuery
        ? Task.find(taskQuery).sort({ createdAt: -1 }).lean()
        : [],
    ]);
    const studentById = new Map(
      students.map((student) => [student._id.toString(), student])
    );
    const serializedTasks = tasks.map((task) =>
      serializeTask(task, studentById.get(task.studentId.toString()))
    );
    const attendanceValues = students
      .map((student) => student.attendance)
      .filter(Number.isFinite);
    const averageAttendance = attendanceValues.length
      ? Math.round(
          attendanceValues.reduce((total, attendance) => total + attendance, 0) /
            attendanceValues.length
        )
      : null;

    return res.json({
      success: true,
      teacher: {
        id: teacher._id,
        fullName: teacher.fullName,
        username: teacher.username,
        email: teacher.email || "",
        department: teacher.department || "",
        identifier: teacher.identifier || "",
        phone: teacher.phone || "",
        bio: teacher.bio || "",
        designation: teacher.designation || "",
        office: teacher.office || "",
        specialization: teacher.specialization || "",
      },
      stats: {
        assignedStudentsCount: students.length,
        pendingAppointmentsCount: appointments.filter(
          (appointment) => appointment.status === "Pending"
        ).length,
        openTasksCount: tasks.filter((task) => !task.completed).length,
        averageClassPerformance: averageAttendance,
      },
      students: students.map((student) => {
        const studentTasks = serializedTasks.filter(
          (task) => task.studentId.toString() === student._id.toString()
        );
        const latestTask = studentTasks[0];
        const gpa = student.gpa ?? null;
        const attendance = student.attendance ?? null;
        const performanceStatus =
          gpa == null && attendance == null
            ? "Not recorded"
            : (attendance != null && attendance < 75) ||
                (gpa != null && gpa < 6)
            ? "High Priority"
            : (attendance != null && attendance < 85) ||
                (gpa != null && gpa < 7)
              ? "Needs Support"
              : gpa != null && gpa >= 8.5
                ? "Improving"
                : "Steady";

        return {
          id: student._id,
          fullName: student.fullName,
          identifier: student.identifier || "",
          program: student.semester || student.department || "",
          attendance,
          gpa,
          performanceStatus,
          status: attendance != null && attendance < 75 ? "High priority" : "Active",
          assignedTask: latestTask?.task || "",
          taskDue: latestTask?.dueDate || "",
        };
      }),
      requests: appointments.map((appointment) => {
        const student = studentById.get(appointment.studentId.toString());
        return {
          id: appointment._id,
          studentName: student?.fullName || appointment.studentUsername,
          studentId: student?.identifier || "",
          type: appointment.type,
          title: appointment.title,
          date: appointment.date,
          time: appointment.time,
          status: appointment.status === "Pending" ? "New" : appointment.status,
          notes: appointment.notes || "",
        };
      }),
      tasks: serializedTasks,
      notifications: [],
    });
  } catch (error) {
    console.error("Teacher dashboard data error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching teacher dashboard.",
    });
  }
}

// PATCH /api/teacher/appointments/:appointmentId
export async function updateAppointment(req, res) {
  try {
    const { appointmentId } = req.params;
    const { status, date, time } = req.body ?? {};
    if (!mongoose.isValidObjectId(appointmentId)) {
      return res.status(400).json({
        success: false,
        message: "A valid appointment is required.",
      });
    }

    const assignedStudentIds = await User.find(
      getAssignedStudentsQuery(req.user)
    ).distinct("_id");
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      counsellorName: req.user.fullName,
      studentId: { $in: assignedStudentIds },
    });
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found for this teacher.",
      });
    }

    if (status === "Rescheduled") {
      if (
        typeof date !== "string" ||
        typeof time !== "string" ||
        !date.trim() ||
        !time.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "A new appointment date and time are required.",
        });
      }
      appointment.date = date.trim();
      appointment.time = time.trim();
      appointment.status = "Pending";
    } else if (["Accepted", "Rejected", "Completed"].includes(status)) {
      appointment.status = status;
    } else {
      return res.status(400).json({
        success: false,
        message: "Select a valid appointment action.",
      });
    }

    await appointment.save();
    return res.json({
      success: true,
      message: "Appointment updated successfully.",
      appointment: {
        id: appointment._id,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status === "Pending" ? "New" : appointment.status,
      },
    });
  } catch (error) {
    console.error("Teacher appointment update error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating appointment.",
    });
  }
}

// POST /api/teacher/tasks
export async function createTask(req, res) {
  try {
    const { studentId, title, dueDate, priority, feedback } = req.body ?? {};
    if (
      !mongoose.isValidObjectId(studentId) ||
      typeof title !== "string" ||
      !title.trim() ||
      typeof dueDate !== "string" ||
      !dueDate.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Select a student and provide a task title and due date.",
      });
    }
    if (!["High", "Medium", "Low"].includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Select a valid task priority.",
      });
    }

    const student = await User.findOne({
      _id: studentId,
      role: "student",
      ...(req.user.department ? { department: req.user.department } : {}),
    });
    if (!student || !isAssignedStudent(student, req.user)) {
      return res.status(404).json({
        success: false,
        message: "Student is not assigned to this teacher.",
      });
    }

    const task = await Task.create({
      studentId: student._id,
      studentUsername: student.username,
      title: title.trim(),
      assignedBy: req.user.fullName,
      assignedById: req.user._id,
      dueDate: dueDate.trim(),
      completed: false,
      priority,
      category: "Academic",
      feedback: typeof feedback === "string" ? feedback.trim() : "",
    });

    return res.status(201).json({
      success: true,
      message: "Task assigned successfully.",
      task: serializeTask(task, student),
    });
  } catch (error) {
    console.error("Teacher task creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Error assigning task.",
    });
  }
}

// PATCH /api/teacher/tasks/:taskId/complete
export async function completeTask(req, res) {
  try {
    const { taskId } = req.params;
    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({
        success: false,
        message: "A valid task is required.",
      });
    }

    const assignedStudentIds = await User.find(
      getAssignedStudentsQuery(req.user)
    ).distinct("_id");
    const task = await Task.findOne({
      _id: taskId,
      studentId: { $in: assignedStudentIds },
      $or: [
        { assignedById: req.user._id },
        {
          assignedBy: req.user.fullName,
          assignedById: null,
        },
      ],
    });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found for this teacher.",
      });
    }

    task.completed = true;
    await task.save();
    const student = await User.findById(task.studentId).select("fullName");
    return res.json({
      success: true,
      message: "Task marked as complete.",
      task: serializeTask(task, student),
    });
  } catch (error) {
    console.error("Teacher task update error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating task.",
    });
  }
}
