
import asyncHandler from "../middleware/asyncHandler.js";
import Blog from "../models/blogModel.js";
import Course from "../models/courseModel.js";
import Faqs from "../models/faqsModel.js";
import Enrollment from "../models/enrollmentModel.js";
import Service from "../models/serviceModel.js";
import AdmissionBatch from "../models/admissionBatchModel.js";
import Gallery from "../models/galleryModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js"

// // Function to fetch active, inactive, and total counts for a given model
// const fetchModelData = async (model) => {
//   const [active, inactive, total] = await Promise.all([
//     model.countDocuments({ isActive: true }),
//     model.countDocuments({ isActive: false }),
//     model.countDocuments()
//   ]);

//   if (!active && !inactive && !total) {
//     throw new Error(`${model.modelName} not found`);
//   }

//   return { active, inactive, total };
// };

// Function to fetch active, inactive, and total counts for a given model
const fetchModelData = async (model) => {
  try {
    const [active, inactive, total] = await Promise.all([
      model.countDocuments({ isActive: true }),
      model.countDocuments({ isActive: false }),
      model.countDocuments()
    ]);

    return { active: active || 0, inactive: inactive || 0, total: total || 0 };
  } catch (error) {
    // Handle potential errors, e.g., log the error
    console.error(`Error fetching data for ${model.modelName}:`, error);
    return { active: 0, inactive: 0, total: 0 };
  }
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
    User.countDocuments({ isAdmin: false, isTeamMember: false }),
    User.countDocuments()
  ]);

  if (!total) {
    return res.status(404).json({admin:0, members:0, users:0, total:0, message: "Users not found" });
  }

  res.status(200).json({ admin, members, users, total });
});


// @desc    Fetch all enrollment
// @route   GET /api/admin-dashboard/enrollment
// @access  Private/Admin
const getEnrollments = asyncHandler(async (req, res) => {
  const total = await Enrollment.countDocuments();

  if (!total) {
    return res.status(200).json({ total: 0, message: "Enrollment not found" });
  }

  res.status(200).json({ total });
});

// // @desc    Fetch the most recent admission batch with enrollments
// // @route   GET /api/admin-dashboard/admission-batch-details
// // @access  Private/Admin
const getAdmissionDetails = asyncHandler(async (req, res) => {
  try {
    const admissionBatches = await AdmissionBatch.find().lean();

    if (!admissionBatches.length) {
      return res.status(404).json({ message: 'No admission batches found' });
    }

    const allAdmissionDetails = await Promise.all(admissionBatches.map(async (batch) => {
      const enrollments = await Enrollment.find({ admissionBatchId: batch._id }).populate('courseId').lean();

      const coursesWithEnrollments = batch.selectedCourses.map((course) => {
        const courseEnrollments = enrollments.filter((enrollment) => enrollment.courseId._id.equals(course.courseId));
        return {
          name: courseEnrollments.length > 0 ? courseEnrollments[0].courseId.title : 'Unknown Course',
          enrollments: courseEnrollments.length
        };
      });

      return {
        admissionBatchName: batch.title,
        totalEnrollmentsInThisBatch: enrollments.length,
        courses: coursesWithEnrollments
      };
    }));

    res.status(200).json(allAdmissionDetails);
  } catch (error) {
    console.error('Error fetching admission details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// @desc    Fetch the most recent admission batch with enrollments
// @route   GET /api/admin-dashboard/admission-batch-details
// @access  Private/Admins
// const getAdmissionDetails = asyncHandler(async (req, res) => {
//   try {
//     // const admissionBatches = await AdmissionBatch.find().lean();
//     const admissionBatches = await AdmissionBatch.find().populate('selectedCourses.courseId').lean();

//     if (admissionBatches.length == 0) {
//       return res.status(404).json({admissionBatchName:0, totalEnrollmentsInThisBatch:0, courses:0, message: 'No admission batches found' });
//     }

//     const allAdmissionDetails = await Promise.all(admissionBatches.map(async (batch) => {
//       const enrollments = await Enrollment.find({ admissionBatchId: batch._id }).populate('courseId').lean();

//       const coursesWithEnrollments = batch.selectedCourses.map((course) => {
//         const courseEnrollments = enrollments.filter((enrollment) => enrollment.courseId._id.equals(course.courseId));
//         return {
//           name: courseEnrollments.length > 0 ? courseEnrollments[0].courseId.title : 'Unknown Course',
//           enrollments: courseEnrollments.length
//         };
//       });

//       return {
//         admissionBatchName: batch.title,
//         totalEnrollmentsInThisBatch: enrollments.length,
//         courses: coursesWithEnrollments
//       };
//     }));

//     res.status(200).json(allAdmissionDetails);
//   } catch (error) {
//     console.error('Error fetching admission details:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// @desc    Fetch all enrollment
// @route   GET /api/admin-dashboard/user-rolles
// @access  Private/Admin
const getUserRole = asyncHandler(async (req, res) => {
  const [admins, members, users, total] = await Promise.all([
    User.find({ isAdmin: true }).select('name image isAdmin email isTeamMember'),
    User.find({ isAdmin: false, isTeamMember: true }).select('name image isAdmin email isTeamMember'),
    User.find({ isAdmin: false, isTeamMember: false }).select('name image isAdmin email isTeamMember'),
    User.countDocuments()
  ]);

  if (!total) {
    throw new Error(`Admin or Member not found`);
  }

  res.status(200).json({ admins, members, users, total });
});





export {
  getBlogs,
  getCourses,
  getFaqs,
  getServices,
  getAdmissionBatches,
  getGallery,
  getProducts,
  getUsers,
  getEnrollments,
  getUserRole,
  getAdmissionDetails
};
