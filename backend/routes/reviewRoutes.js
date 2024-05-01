import express from "express";
const router = express.Router();
import {
  getReviewsForCourse,
  createCourseReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/:courseId")
  .get(getReviewsForCourse)
  .post(protect, createCourseReview);

router.route("/:id")
  .put(protect, updateReview)
  .delete(protect, deleteReview);

export default router;
