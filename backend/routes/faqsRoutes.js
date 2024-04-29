import express from "express";
const router = express.Router();
import {
  getFaqs,
  getActiveFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../controllers/faqsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";


router.route("/").get(getFaqs).post(protect, admin, createFaq);
router.route("/active-faqs").get(getActiveFaqs)

router
  .route("/:id")
  .get(checkObjectId, getFaqById)
  .delete(protect, admin, checkObjectId, deleteFaq);

router
  .route("/:id/edit")
  .put(protect, admin, updateFaq)
export default router;
