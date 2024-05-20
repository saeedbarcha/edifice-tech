import express from "express";
const router = express.Router();
import {
    getUsers,
    getBlogs,
    getCourses,
    getFaqs,
    getServices,
    getAdmissionBatches,
    getGallery,
    getProducts
} from "../controllers/adminDashboardController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";


router.route("/blogs").get(protect, admin, getBlogs);
router.route("/courses").get(protect, admin, getCourses);
router.route("/faqs").get(protect, admin, getFaqs);
router.route("/galleries").get(protect, admin, getGallery);
router.route("/services").get(protect, admin, getServices);
router.route("/galleries").get(protect, admin, getGallery);
router.route("/admission-batches").get(protect, admin, getAdmissionBatches);
router.route("/products").get(protect, admin, getProducts);
router.route("/users").get(protect, admin, getUsers);



export default router;
