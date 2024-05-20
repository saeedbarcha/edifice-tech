
import asyncHandler from "../middleware/asyncHandler.js";
import Blog from "../models/blogModel.js";
import Course from "../models/courseModel.js";
import Faqs from "../models/faqsModel.js";
import Service from "../models/serviceModel.js";
import AdmissionBatch from "../models/admissionBatchModel.js";
import Gallery from "../models/galleryModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js"

// Function to fetch active, inactive, and total counts for a given model
const fetchModelData = async (model) => {
  const [active, inactive, total] = await Promise.all([
    model.countDocuments({ isActive: true }),
    model.countDocuments({ isActive: false }),
    model.countDocuments()
  ]);

  if (!active && !inactive && !total) {
    throw new Error(`${model.modelName} not found`);
  }

  return { active, inactive, total };
};

// @desc    Fetch all Blogs 
// @route   GET /api/admin-dashboard/blogs
// @access  Private/Admin
const getBlogs = asyncHandler(async (req, res) => {
  const data = await fetchModelData(Blog);
  res.status(200).json(data);
});

// @desc    Fetch all courses 
// @route   GET /api/admin-dashboard/courses
// @access  Private/Admin
const getCourses = asyncHandler(async (req, res) => {
  const data = await fetchModelData(Course);
  res.status(200).json(data);
});

// @desc    Fetch all FAQs 
// @route   GET /api/admin-dashboard/faqs
// @access  Private/Admin
const getFaqs = asyncHandler(async (req, res) => {
  const data = await fetchModelData(Faqs);
  res.status(200).json(data);
});

// @desc    Fetch all services 
// @route   GET /api/admin-dashboard/services
// @access  Private/Admin
const getServices = asyncHandler(async (req, res) => {
  const data = await fetchModelData(Service);
  res.status(200).json(data);
});


// @desc    Fetch all admission batches 
// @route   GET /api/admin-dashboard/admission-batches
// @access  Private/Admin
const getAdmissionBatches = asyncHandler(async (req, res) => {
  const data = await fetchModelData(AdmissionBatch);
  res.status(200).json(data);
});

// @desc    Fetch all gallery
// @route   GET /api/admin-dashboard/gallery
// @access  Private/Admin
const getGallery = asyncHandler(async (req, res) => {
  const data = await fetchModelData(Gallery);
  res.status(200).json(data);
});

// @desc    Fetch all products
// @route   GET /api/admin-dashboard/products
// @access  Private/Admin
const getProducts = asyncHandler(async (req, res) => {
  const data = await fetchModelData(Product);
  res.status(200).json(data);
});

// @desc    Fetch all users
// @route   GET /api/admin-dashboard/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const [admin, members, users, total] = await Promise.all([
    User.countDocuments({ isAdmin: true }),
    User.countDocuments({ isTeamMember: true }),
    User.countDocuments({ isAdmin: false, isTeamMember: false  }),
    User.countDocuments()
  ]);

  if (!admin && !members && !users && !total) {
    throw new Error(`User not found`);
  }

  res.status(200).json({ admin, members, users, total});

});


export {
  getBlogs,
  getCourses,
  getFaqs,
  getServices,
  getAdmissionBatches,
  getGallery,
  getProducts,
  getUsers
  
};
