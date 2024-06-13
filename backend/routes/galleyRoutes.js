import express from "express";
const router = express.Router();
import {
  getGallarys,
  getActiveGallarys,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from "../controllers/galleryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";


router.route("/").get(getGallarys).post(protect, admin, addGalleryItem);
router.route("/all-active").get(getActiveGallarys);
router
  .route("/:id")
  .put(protect, admin, checkObjectId, updateGalleryItem)
  .delete(protect, admin, checkObjectId, deleteGalleryItem);

export default router;
