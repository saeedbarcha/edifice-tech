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

// @desc    Fetch a single Admission Batch by id
// @route   GET /api/admission-batches/:id
// @access  Public
const getAdmissionBatchById = asyncHandler(async (req, res) => {
  const admissionBatch = await AdmissionBatch.findById(req.params.id).populate({
    path: "courses.courseId",
    // populate: { path: 'enrolledUsers.user', select: 'name' }
  });
  if (admissionBatch) {
    return res.json(admissionBatch);
  } else {
    res.status(404);
    throw new Error("Admission batch not found");
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
    courses, // Array of courses with courseId and enrolledUsers
  } = req.body;
  console.log("llllllllll", req.body);
  // console.log("rrrrrrrrrres....",  req.body)
  // Check if required fields are provided
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

  // Prepare courses data with empty enrolledUsers array
  const preparedCourses = courses.map((course) => ({
    courseId: course,
    enrolledUsers: [],
  }));

  console.log("preparedCourses....", preparedCourses);

  // Create the admission batch object
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
  console.log("aaaaaaaaaaaa....", admissionBatch);

  // If admission batch is created successfully, send back a response
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
    courses, // Array of courses with courseId and enrolledUsers
  } = req.body;

  console.log("hhhhhhhhhhhhh", req.params.id);
  const admissionBatchId = req.params.id;

  // Prepare courses data with empty enrolledUsers array
  const preparedCourses = courses.map((course) => ({
    courseId: course,
    enrolledUsers: [],
  }));
  // Retrieve existing admission batch from the database
  let admissionBatch = await AdmissionBatch.findById({ _id: admissionBatchId });
  console.log("admissionBatch", admissionBatch);

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

  // Save the updated admission batch
  const updatedAdmissionBatch = await admissionBatch.save();

  // If admission batch is updated successfully, send back a response
  if (updatedAdmissionBatch) {
    res.status(200).json(updatedAdmissionBatch);
  } else {
    res.status(400);
    throw new Error("Failed to update admission batch");
  }
});

// // @desc    Update Admission Batch including course enrollment
// // @route   PUT /api/admission-batches/:id/enroll
// // // @access  Private/login
// const updateToEnrollAdmissionBatch = asyncHandler(async (req, res) => {
//   console.log("hhhhhhhhhhhhhhhhhhhhh", req.body); // Check if `id` is present
//   const admissionBatchId = req.body.admissionBatchId;

//   try {
//     let admissionBatch = await AdmissionBatch.findById(admissionBatchId);
//     const foundCourse = admissionBatch.courses.find(course => course.courseId.equals(req.body.courseId));

//     if (!admissionBatch) {
//       res.status(404);
//       throw new Error("Admission batch not found");
//     }

//     const {
//       coursesToEnroll, // Array of courses to enroll users
//     } = req.body;

//     // Loop through courses to enroll and update admission batch
//     admissionBatch.courses.forEach(async (courseToEnroll) => {
//       console.log("ssssssssssss courseToEnroll", courseToEnroll)
//       const { courseId, userId } = courseToEnroll;

//       const courseIndex = admissionBatch.courses.findIndex(course => course.courseId === courseId);

//       if (courseIndex === -1) {
//         res.status(404);
//         throw new Error(`Course with ID ${courseId} not found in admission batch`);
//       }

//       const alreadyEnrolled = admissionBatch.courses[courseIndex].enrolledUsers.some(user => user.user === userId);

//       if (alreadyEnrolled) {
//         res.status(400);
//         throw new Error(`User with ID ${userId} is already enrolled in the course`);
//       }

//       admissionBatch.courses[courseIndex].enrolledUsers.push({
//         user: req.user._id,
//         completed: false,
//         courseFeePaid: false,
//         performance: 'Average'
//       });
//     });

//     const updatedAdmissionBatch = await admissionBatch.save();
//     res.status(200).json(updatedAdmissionBatch);
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     res.status(error.statusCode || 500).json({ error: error.message || 'Internal server error' });
//   }
// });

// @desc    Update Admission Batch including course enrollment
// @route   PUT /api/admission-batches/:id/enroll
// // @access  Private/login
const updateToEnrollAdmissionBatch = asyncHandler(async (req, res) => {
  console.log("hhhhhhhhhhhhhhhhhhhhh", req.body); // Check if `id` is present
  const admissionBatchId = req.body.admissionBatchId;

  try {
    let admissionBatch = await AdmissionBatch.findById(admissionBatchId);
    const foundCourse = admissionBatch.courses.find((course) =>
      course.courseId.equals(req.body.courseId)
    );
    // console.log("foundCourse", foundCourse);
    // console.log("ffffffffffffffvvvvvvvvvv", req.user);

    foundCourse.enrolledUsers.map((enrollUser) => {
    console.log("ffffffffffffffvvvvvvvvvv", enrollUser.user);
      
      if (enrollUser.user !== req.user._id) {
        console.log("gggggggggggggggg");
      }
    });
    if (!admissionBatch) {
      res.status(404);
      throw new Error("Admission batch not found");
    } else if (!foundCourse) {
      res.status(404);
      throw new Error("Course not found");
    } else {
      foundCourse.enrolledUsers.push({
        user: req.user._id,
        completed: false,
        courseFeePaid: false,
        performance: "Average",
      });
    }

    const updatedAdmissionBatch = await admissionBatch.save();
    res.status(200).json(updatedAdmissionBatch);
  } catch (error) {
    // Handle errors
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Internal server error" });
  }
});

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
