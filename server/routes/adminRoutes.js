import { Router } from "express";
import {
  createAccount,
  deleteAccount,
  getAdminDashboard,
  updateTeacher,
} from "../controllers/adminController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);
router.use(authorizeRoles("admin"));

router.get("/dashboard", getAdminDashboard);
router.post("/users", createAccount);
router.patch("/users/:userId", updateTeacher);
router.delete("/users/:userId", deleteAccount);

export default router;
