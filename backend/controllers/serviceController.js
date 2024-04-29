import asyncHandler from "../middleware/asyncHandler.js";
import Service from "../models/serviceModel.js";

// @desc    Fetch all Services
// @route   GET /api/Services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const Services = await Service.find({});
  res.status(200).json(Services);
});

// @desc    Fetch all active Services
// @route   GET /api/Services/active
// @access  Public
const getAllActiveServices = asyncHandler(async (req, res) => {
  const activeServices = await Service.find({ isActive: true });
  res.status(200).json(activeServices);

  // If you need pagination, you can implement it here as well
});

// @desc    Fetch a single Service by id
// @route   GET /api/Service/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    return res.json(service);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Create a new Service
// @route   POST /api/Services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    iconImage,
    bannerImage,
    youtubeVideoUrl,
    isActive,
  } = req.body;

  try {
    // Create a new Service instance
    const newService = new Service({
      user: req.user._id,
      title,
      description,
      iconImage,
      bannerImage,
      youtubeVideoUrl,
      isActive,
    });

    const createdService = await newService.save();

    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Update Service
// @route   PUT /api/Services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    iconImage,
    bannerImage,
    youtubeVideoUrl,
    isActive,
  } = req.body;

  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      service.title = title || service.title;
      service.description = description || service.description;
      service.iconImage = iconImage || service.iconImage;
      service.bannerImage = bannerImage || service.bannerImage;
      service.youtubeVideoUrl = youtubeVideoUrl || service.youtubeVideoUrl;
      service.isActive = isActive !== undefined ? isActive : service.isActive;

      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Delete a Service
// @route   DELETE /api/Services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    await Service.deleteOne({ _id: service._id });
    res.status(200).json({ message: "Service deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {
  getServices,
  getAllActiveServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
