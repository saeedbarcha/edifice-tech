import express from "express";
const router = express.Router();
import {
  getReviewsForCourse,
  createCourseReview,
  updateCourseReview,
  deleteCourseReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

// router.route("/")
//   .post(protect, createCourseReview);

router.route("/:courseId")
  .post(protect, createCourseReview)
  .get(getReviewsForCourse);

router.route("/:id")
  .put(protect, updateCourseReview)
  .delete(protect, deleteCourseReview);

export default router;
