import { Router } from "express";
import {
  assignStudentMentor,
  getHodDashboard,
} from "../controllers/hodController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);
router.use(authorizeRoles("hod"));

router.get("/dashboard", getHodDashboard);
router.patch("/students/:studentId/mentor", assignStudentMentor);

export default router;
