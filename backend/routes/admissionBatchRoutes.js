import express from "express";
const router = express.Router();
import {
  getAdmissionBatches,
  getAdmissionBatchById,
  updateToEnrollAdmissionBatch,
  updateAdmissionBatch,
  createAdmissionBatch,
  deleteAdmissionBatch,
  getRecentAdmissionBatch
} from "../controllers/AdmissionBatchController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";
router
  .route("/")
  .get(getAdmissionBatches)
  .post(protect, admin, createAdmissionBatch);

  router
  .route("/new-admission")
  .get(getRecentAdmissionBatch)
  router.route("/new-admission/:id/enroll").put(protect, updateToEnrollAdmissionBatch);

router
  .route("/:id")
  .get(getAdmissionBatchById)
  .delete(protect, admin, checkObjectId, deleteAdmissionBatch)
  .put(protect, admin, checkObjectId, updateAdmissionBatch)

export default router;
