import express from "express";
const router = express.Router();
import {
    deleteEnrollment,
    updateEnrollment,
    newEnrollment,
    getUserAdmissionBatches
} from "../controllers/enrollmentController.js";
import { protect } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";


router
  .route("/")
  .post(protect, newEnrollment)
  router
  .route("/my-enrollments/:id")
  .get(protect, getUserAdmissionBatches)
  

export default router;