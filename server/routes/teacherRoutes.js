import { Router } from "express";
import {
  completeTask,
  createTask,
  getTeacherDashboard,
  updateAppointment,
} from "../controllers/teacherController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);
router.use(authorizeRoles("teacher"));

router.get("/dashboard", getTeacherDashboard);
router.patch("/appointments/:appointmentId", updateAppointment);
router.post("/tasks", createTask);
router.patch("/tasks/:taskId/complete", completeTask);

export default router;
