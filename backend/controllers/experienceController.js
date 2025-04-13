import asyncHandler from "../middleware/asyncHandler.js";
import Experience from "../models/experienceModel.js";


// add experience
const addExperience = asyncHandler(async (req, res) => {
  const { designation, instituteName, joiningDate, endingDate } = req.body;

  // Create a new experience instance
  const experience = new Experience({
    user:req.user._id,
    designation,
    instituteName,
    joiningDate,
    endingDate
  });

  try {
    // Save the new experience entry
    const savedExperience = await experience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// update experience
const updateExperience = asyncHandler(async (req, res) => {
  const { designation, instituteName, joiningDate, endingDate } = req.body;

  try {
    let experience = await Experience.findById(req.params.id);

    if (!experience) {
      res.status(404);
      throw new Error("Experience not found");
    }

   experience.designation = designation || experience.designation;
   experience.instituteName = instituteName || experience.instituteName;
   experience.joiningDate = joiningDate || experience.joiningDate ;
   experience.endingDate = endingDate || experience.endingDate;

    experience = await experience.save();
    res.json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// delete experience
const deleteExperience = asyncHandler(async (req, res) => {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      await Experience.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Experience deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Experience not found");
    }
  });


  export {
    deleteExperience,
    addExperience,
    updateExperience
  };
  