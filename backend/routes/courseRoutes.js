import express from "express";
const router = express.Router();
import {
  getCourses,
  getAllActiveCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";


router.route("/").get(getCourses).post(protect, admin, createCourse);
router.route("/active-courses").get(getAllActiveCourses);


router
  .route("/:id")
  .get(checkObjectId, getCourseById)
  .put(protect, admin, checkObjectId, updateCourse)
  .delete(protect, admin, checkObjectId, deleteCourse);

  router
  .route("/:id/edit")
  .put(protect, admin, checkObjectId, updateCourse)

export default router;
