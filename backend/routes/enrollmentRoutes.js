import express from "express";
const router = express.Router();
import {
    deleteEnrollment,
    updateEnrollment,
    getAllAdmissionBatchesWithEnrolments,
    newEnrollment,
    getUserAdmissionBatches
} from "../controllers/enrollmentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";


router
  .route("/")
  .post(protect, newEnrollment).get(protect, admin, getAllAdmissionBatchesWithEnrolments)
  router
  .route("/my-enrollments/:id")
  .get(protect, getUserAdmissionBatches)
  

export default router;