import asyncHandler from "../middleware/asyncHandler.js";
import Course from "../models/courseModel.js";

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json(courses);

  // const pageSize = process.env.PAGINATION_LIMIT;
  // const page = Number(req.query.pageNumber) || 1;

  // const keyword = req.query.keyword ? { name:{$regex: req.query.keyword,
  // $options:"i"} } : {};

  // // find number of courses
  // const count = await Course.countDocuments({...keyword});

  // const courses = await Course.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));

  // res.json({courses, page, pages: Math.ceil(count / pageSize)});
});

// @desc    Fetch all active courses
// @route   GET /api/courses/active
// @access  Public
const getAllActiveCourses = asyncHandler(async (req, res) => {
  const activeCourses = await Course.find({ isActive: true });
  res.status(200).json(activeCourses);

  // If you need pagination, you can implement it here as well
});

// @desc    Fetch a single course by id
// @route   GET /api/course/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    return res.json(course);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Create course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
  const course = await Course({
    name: "Sample",
    user: req.user._id,
    image: "/images/sample.jpg",
    description: "sample description",
    duration: 1,
  });

  const createCourse = await course.save();
  res.status(201).json(createCourse);
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  const {
    title,
    price,
    discount,
    skillSet,
    preRequisites,
    description,
    image,
    hoursInDay,
    daysInWeek,
    totalDuration,
    certificate,
    isActive, // Add isActive from request body
  } = req.body;

  console.log("rrrrrrrrr", certificate, isActive);

  try {
    const course = await Course.findById(req.params.id);

    if (course) {
      course.title = title || course.title;
      course.price = price || course.price;
      course.discount = discount || course.discount;
      course.skillSet = skillSet || course.skillSet;
      course.preRequisites = preRequisites || course.preRequisites;
      course.description = description || course.description;
      course.image = image || course.image;
      course.hoursInDay = hoursInDay || course.hoursInDay;
      course.daysInWeek = daysInWeek || course.daysInWeek;
      course.totalDuration = totalDuration || course.totalDuration;
      course.certificate =
        certificate !== undefined ? certificate : course.certificate; 
      course.isActive = isActive !== undefined ? isActive : course.isActive; 
      
      const updatedCourse = await course.save();
      res.json(updatedCourse);
      // console.log("rrrrrrrrr", updatedCourse);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    await Course.deleteOne({ _id: course._id });
    res.status(200).json({ message: "Course deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Get top rated courses for carousel
// @route   GET /api/orders/top
// @access  Public
// const getTopCourses = asyncHandler(async (req, res) => {
//   const courses = await Course.find({}).sort({rating:-1}).limit(3);
//   res.status(200).json(courses);
// });

export {
  getCourses,
  getAllActiveCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  // getTopCourses
};
