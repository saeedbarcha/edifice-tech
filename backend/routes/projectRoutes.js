import express from "express";
const router = express.Router();
import {
  addProject,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";



router
  .route("/")
  .post(protect, addProject)
router
  .route("/:id")
  .delete(protect, checkObjectId, deleteProject)
  .put(protect, checkObjectId, updateProject)

export default router;
