import { Router } from "express";
import {
  getStudentDashboard,
  updateStudentProfile,
  createAppointment,
  toggleTask,
} from "../controllers/studentController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();

// Protect all routes and ensure role is student
router.use(protect);
router.use(authorizeRoles("student", "admin"));

router.get("/dashboard", getStudentDashboard);
router.put("/profile", updateStudentProfile);
router.post("/appointments", createAppointment);
router.patch("/tasks/:id/toggle", toggleTask);

export default router;
