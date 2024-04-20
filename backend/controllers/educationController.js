import asyncHandler from "../middleware/asyncHandler.js";
import Education from "../models/educationModel.js";


// @desc    Add education
// @route   POST /api/educations
// @access  Private
const addEducation = asyncHandler(async (req, res) => {
  const { degree, course, instituteName, date } = req.body;
  console.log("data............", req.body)

  // Get user ID from req.user
  const userId = req.user._id;

  try {
    // Create a new education instance
    const newEducation = new Education({
      user: userId,
      degree,
      course,
      instituteName,
      date
    });

    // Save the new education instance to the database
    const createdEducation = await newEducation.save();

    res.status(201).json(createdEducation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// @desc    Delete education
// @route   DELETE /api/educations/:id
// @access  Private
const deleteEducation = asyncHandler(async (req, res) => {
    const education = await Education.findById(req.params.id);
    if (education) {
      await Education.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Education deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Education not found");
    }
  });


  
// @desc    Update education
// @route   PUT /api/educations/:id
// @access  Private
const updateEducation = asyncHandler(async (req, res) => {
  const {_id, degree, course, instituteName, date,  } = req.body;

  console.log("resssssssssssssssss...........", req.params)

  const education = await Education.findById(_id);
  if (education) {
    education.degree = degree || education.degree;
    education.course = course || education.course;
    education.instituteName = instituteName || education.instituteName;
    education.date = date || education.date;

    const updatedEducation = await education.save();
    
    res.status(200).json(updatedEducation);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});



export {
  deleteEducation,
  updateEducation,
  addEducation
};