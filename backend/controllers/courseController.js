import asyncHandler from "../middleware/asyncHandler.js";
import Course from "../models/courseModel.js";

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public/admin
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json(courses);
});


// @desc    Fetch all active courses
// @route   GET /api/courses/active
// @access  Public
const getAllActiveCoursesWithPagination = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? { title:{$regex: req.query.keyword,
    $options:"i"} } : {};

   const count = await Course.countDocuments({...keyword, isActive: true});

  const activeCourses = await Course.find({...keyword, isActive: true}).limit(pageSize).skip(pageSize * (page - 1));

  if(!activeCourses){
    res.status(404).json({ message: "Course not found" });
  }
  res.status(200).json({activeCourses, page, pages: Math.ceil(count / pageSize)});


  // If you need pagination, you can implement it here as well
});


// @desc    Fetch all active courses
// @route   GET /api/courses/active-all
// @access  Public
const getAllActiveCourses = asyncHandler(async (req, res) => {

  const activeCourses = await Course.find({isActive: true});

  if(!activeCourses){
    res.status(404).json({ message: "Course not found" });
  }
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

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Admin
const createNewCourse = asyncHandler(async (req, res) => {
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
    isActive,
  } = req.body;

  try {
    // Create a new course instance
    const newCourse = new Course({
      user:req.user._id,
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
      isActive,
    });

    const createdCourse = await newCourse.save();

    res.status(201).json(createdCourse); 
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
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
    isActive, 
  } = req.body;


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
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
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


export {
  getCourses,
  getAllActiveCoursesWithPagination,
  getAllActiveCourses,
  getCourseById,
  createNewCourse,
  updateCourse,
  deleteCourse,
  // getTopCourses
};
