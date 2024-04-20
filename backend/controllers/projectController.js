import asyncHandler from "../middleware/asyncHandler.js";
import Project from "../models/projectModel.js"


// @desc    Delete project
// @route   DELETE /api/project/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (project) {
      await Project.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Project deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Project not found");
    }
  });


// @desc    Update Project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const { title, url, description, image } = req.body;

  const project = await Project.findById(req.params.id);
  if (project) {
    project.title = title || project.title;
    project.url = url || project.url;
    project.description = description || project.description;
    project.image = image || project.image;
    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});


// @desc    Add Project
// @route   POST /api/projects
// @access  Private
const addProject = asyncHandler(async (req, res) => {
  const { title, url, description, image } = req.body;
 console.log("lllllllllllll...", req.body)
  // Create a new project instance with the provided data
  const newProject = new Project({
    user:req.user._id,
    title,
    url,
    description,
    image,
  });

  // Save the new project to the database
  const createdProject = await newProject.save();

  // Respond with the newly created project
  res.status(201).json(createdProject);
});

  export {
    addProject,
    deleteProject,
    updateProject
  };
  