import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import AdmissionBatch from "../models/admissionBatchModel.js";

// @desc    Fetch all Admission Batches with associated Courses and Users
// @route   GET /api/admission-batches
// @access  Public
const getAdmissionBatches = asyncHandler(async (req, res) => {
  const admissionBatches = await AdmissionBatch.find({}).populate({
    path: "courses.courseId",
    // populate: { path: 'enrolledUsers.user', select: 'name' } // Populate both courses and enrolled users
  });
  res.status(200).json(admissionBatches);
});

// @desc    Fetch all Admission Batches with associated Courses and Users
// @route   GET /api/admission-batches
// @access  Public
const getRecentAdmissionBatch = asyncHandler(async (req, res) => {
  const admissionBatches = await AdmissionBatch.find({})
    .populate({ path: "courses.courseId" })
    .sort({ _id: -1 }) // Sort by _id in descending order to get the last one
    .limit(1); // Limit to only the last batch

  const lastBatch = admissionBatches[0]; // Extract the first (and only) element

  res.status(200).json(lastBatch);
});

// // @desc    Fetch a single Admission Batch by id
// // @route   GET /api/admission-batches/:id
// // @access  Public
// const getAdmissionBatchById = asyncHandler(async (req, res) => {
//   const admissionBatch = await AdmissionBatch.findById(req.params.id).populate({
//     path: "courses.courseId",
//     // populate: { path: 'enrolledUsers.user', select: 'name' }
//   });
//   if (admissionBatch) {
//     return res.json(admissionBatch);
//   } else {
//     res.status(404);
//     throw new Error("Admission batch not found");
//   }
// });

// @desc    Fetch a single Admission Batch by id with populated course data
// @route   GET /api/admission-batches/:id
// @access  Public
const getAdmissionBatchById = asyncHandler(async (req, res) => {
  try {
    const admissionBatch = await AdmissionBatch.findById(req.params.id)
      .populate({
        path: "courses.courseId",
        // Optionally, you can populate further fields if needed
        // populate: { path: 'enrolledUsers.user', select: 'name' }
      });

    if (!admissionBatch) {
      res.status(404);
      throw new Error("Admission batch not found");
    }

    return res.json(admissionBatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// @desc    Create Admission Batch
// @route   POST /api/admission-batches
// @access  Private/Admin
const createAdmissionBatch = asyncHandler(async (req, res) => {
  const {
    title,
    admissionFee,
    description,
    image,
    startDate,
    endDate,
    lastDateToApply,
    certificate,
    isActive,
    courses,
  } = req.body;
  if (
    !title ||
    !admissionFee ||
    !startDate ||
    !endDate ||
    !lastDateToApply ||
    !Array.isArray(courses) ||
    courses.length === 0
  ) {
    res.status(400);
    throw new Error("All required fields must be provided");
  }

  const preparedCourses = courses.map((course) => ({
    courseId: course,
    enrolledUsers: [],
  }));

  const admissionBatch = await AdmissionBatch.create({
    user: req.user._id,
    title,
    image,
    description,
    admissionFee,
    startDate,
    endDate,
    lastDateToApply,
    certificate,
    isActive,
    courses: preparedCourses,
  });

  if (admissionBatch) {
    res.status(201).json(admissionBatch);
  } else {
    res.status(400);
    throw new Error("Failed to create admission batch");
  }
});

// @desc    Update Admission Batch
// @route   PUT /api/admission-batches/:id
// @access  Private/Admin
const updateAdmissionBatch = asyncHandler(async (req, res) => {
  const {
    title,
    admissionFee,
    description,
    image,
    startDate,
    endDate,
    lastDateToApply,
    certificate,
    isActive,
    courses,
  } = req.body;

  const admissionBatchId = req.params.id;

  const preparedCourses = courses.map((course) => ({
    courseId: course,
    enrolledUsers: [],
  }));
  let admissionBatch = await AdmissionBatch.findById({ _id: admissionBatchId });

  if (!admissionBatch) {
    res.status(404);
    throw new Error("Admission batch not found");
  }

  // Update admission batch fields
  admissionBatch.title = title || admissionBatch.title;
  admissionBatch.admissionFee = admissionFee || admissionBatch.admissionFee;
  admissionBatch.description = description || admissionBatch.description;
  admissionBatch.image = image || admissionBatch.image;
  admissionBatch.startDate = startDate || admissionBatch.startDate;
  admissionBatch.endDate = endDate || admissionBatch.endDate;
  admissionBatch.lastDateToApply =
    lastDateToApply || admissionBatch.lastDateToApply;

  admissionBatch.certificate =
    certificate !== undefined ? certificate : admissionBatch.certificate;
  admissionBatch.isActive =
    isActive !== undefined ? isActive : admissionBatch.isActive;
  admissionBatch.courses = preparedCourses || admissionBatch.courses;

  const updatedAdmissionBatch = await admissionBatch.save();
  if (updatedAdmissionBatch) {
    res.status(200).json(updatedAdmissionBatch);
  } else {
    res.status(400);
    throw new Error("Failed to update admission batch");
  }
});

// @desc    Update Admission Batch including course enrollment
// @route   PUT /api/admission-batches/:id/enroll
// // @access  Private/login
// const updateToEnrollAdmissionBatch = asyncHandler(async (req, res) => {
//   const { admissionBatchId, firstName, lastName, fatherName, courses } = req.body;

//   try {
//     let admissionBatch = await AdmissionBatch.findById(admissionBatchId);
//     if (!admissionBatch) {
//       res.status(404);
//       throw new Error("Admission batch not found");
//     }
//     if (admissionBatch.courses) {
//       admissionBatch.courses.map((courses) => {

//         courses.enrolledUsers.push({
//           user: req.user._id,
//           firstName,
//           lastName,
//           fatherName,
//           completed: false,
//           courseFeePaid: false,
//           performance: "Average",
//         });
//         console.log("lllllllllllll......", courses)
//       })
//     }
//     const updatedAdmissionBatch = await admissionBatch.save();
//     res.status(200).json(updatedAdmissionBatch);
//   } catch (error) {
//     res.status(500);
//     throw new Error("Internal server error");
//   }
// });
const updateToEnrollAdmissionBatch = asyncHandler(async (req, res) => {
  const { admissionBatchId, firstName, lastName, fatherName, courses } = req.body;

  try {
    let admissionBatch = await AdmissionBatch.findById(admissionBatchId);
    if (!admissionBatch) {
      res.status(404);
      throw new Error("Admission batch not found");
    }

    admissionBatch.courses.map(course => {

      courses.map((c) => {
        if (c == course._id.toString()) {
          course.enrolledUsers.push({
            user: req.user._id,
            firstName,
            lastName,
            fatherName,
            completed: false,
            courseFeePaid: false,
            performance: "Average",
          });
        }
      }
      )
    }
    );

    const updatedAdmissionBatch = await admissionBatch.save();
    res.status(200).json(updatedAdmissionBatch);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// // @desc    Update Admission Batch including course enrollment
// // @route   PUT /api/admission-batches/:id/enroll
// // // @access  Private/login
// const updateToEnrollAdmissionBatch = asyncHandler(async (req, res) => {
//   const admissionBatchId = req.body.admissionBatchId;

//   try {
//     let admissionBatch = await AdmissionBatch.findById(admissionBatchId);
//     const foundCourse = admissionBatch.courses.find((course) =>
//       course.courseId.equals(req.body.courseId)
//     );

//     if (!admissionBatch) {
//       res.status(404);
//       throw new Error("Admission batch not found");
//     } else if (!foundCourse) {
//       res.status(404);
//       throw new Error("Course not found");
//     } else {
//       foundCourse.enrolledUsers.push({
//         user: req.user._id,
//         completed: false,
//         courseFeePaid: false,
//         performance: "Average",
//       });
//     }

//     const updatedAdmissionBatch = await admissionBatch.save();
//     res.status(200).json(updatedAdmissionBatch);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(error.statusCode || 500)
//       .json({ error: error.message || "Internal server error" });
//   }
// });

// @desc    Delete an Admission Batch
// @route   DELETE /api/admission-batches/:id
// @access  Private/Admin
const deleteAdmissionBatch = asyncHandler(async (req, res) => {
  const admissionBatch = await AdmissionBatch.findById(req.params.id);

  if (admissionBatch) {
    await AdmissionBatch.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Admission batch deleted" });
  } else {
    res.status(404);
    throw new Error("Admission batch not found");
  }
});

export {
  getAdmissionBatches,
  updateToEnrollAdmissionBatch,
  updateAdmissionBatch,
  getRecentAdmissionBatch,
  getAdmissionBatchById,
  createAdmissionBatch,
  deleteAdmissionBatch,
};
