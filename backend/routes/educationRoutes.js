import express from "express";
const router = express.Router();
import {
  addEducation,
    deleteEducation,
    updateEducation
} from "../controllers/educationController.js";
import { protect } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";


router
  .route("/:id")
  .put(protect, checkObjectId, updateEducation)
  .delete(protect, checkObjectId, deleteEducation);

  router
  .route("/")
  .post(protect, addEducation)
  

export default router;