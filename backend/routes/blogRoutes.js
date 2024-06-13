import express from "express";
const router = express.Router();
import {
    getBlogs,
    getActiveBlogs,
    getBlogById,
    createBlog,
    deleteBlog,
    updateBlog
} from "../controllers/blogController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";


router.route("/").get(getBlogs).post(protect, admin, createBlog);
router.route("/active-blogs").get(getActiveBlogs);
router
  .route("/:id")
  .get( getBlogById)
  .put(protect, admin, checkObjectId, updateBlog)
  .delete(protect, admin, checkObjectId, deleteBlog);
export default router;
