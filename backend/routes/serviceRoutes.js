import express from "express";
const router = express.Router();
import {
    getServices,
    getAllActiveServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
} from "../controllers/serviceController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";


router.route("/").get(getServices).post(protect, admin, createService);
router.route("/active-services").get(getAllActiveServices);


router
  .route("/:id")
  .get(getServiceById)
  .delete(protect, admin, checkObjectId, deleteService);

  router
  .route("/:id/edit")
  .put(protect, admin, updateService)

export default router;
