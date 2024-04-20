import express from "express";
const router = express.Router();
import {
  deleteExperience,
  addExperience,
  updateExperience
} from "../controllers/experienceController.js";
import { protect } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";


router
  .route("/:id")
  .put(protect, checkObjectId, updateExperience)
  .delete(protect, checkObjectId, deleteExperience);
router
  .route("/")
  .post(protect, addExperience)
export default router;