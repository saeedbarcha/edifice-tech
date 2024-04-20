import express from "express";
const router = express.Router();
import {
    getAboutCompany,
    updateAboutCompany
} from "../controllers/aboutCompanyController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";


router.route("/").get(getAboutCompany);
router
  .route("/:id")
  .put(protect, admin, checkObjectId, updateAboutCompany)
export default router;
