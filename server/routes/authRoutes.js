import { Router } from "express";
import {
  getMe,
  login,
  registerStudent,
  updateMyProfile,
} from "../controllers/authController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", protect, authorizeRoles("admin"), registerStudent);
router.get("/me", protect, getMe);
router.put("/profile", protect, updateMyProfile);

export default router;
