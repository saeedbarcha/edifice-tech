import express from "express";
const router = express.Router();
import {
  getAdmissionBatches,
  getAdmissionBatchById,
  updateAdmissionBatch,
  createAdmissionBatch,
  deleteAdmissionBatch,
  getRecentAdmissionBatch
} from "../controllers/admissionBatchController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";
router
  .route("/")
  .get(getAdmissionBatches)
  .post(protect, admin, createAdmissionBatch);

  router
  .route("/new-admission")
  .get(getRecentAdmissionBatch)
router
  .route("/:id")
  .get(getAdmissionBatchById)
  .delete(protect, admin, checkObjectId, deleteAdmissionBatch)
  .put(protect, admin, checkObjectId, updateAdmissionBatch)

export default router;
// 