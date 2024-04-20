import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Education from "../models/educationModel.js";
import Experience from "../models/experienceModel.js";
import Project from "../models/projectModel.js";
import { sendGreetingsMail } from "../utils/sendGreetingsMail.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      address: user.address,
      isAdmin: user.isAdmin,
      skill: user.skill,
      companyCode: user.companyCode,
      designation: user.designation,
      description: user.description,
      fiverrUrl: user.fiverrUrl,
      upworkUrl: user.upworkUrl,
      githubUrl: user.githubUrl,
      facebookUrl: user.facebookUrl,
      instagramUrl: user.instagramUrl,
      linkedInUrl: user.linkedInUrl,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    email,
    password,
    skill,
    companyCode,
    phone,
    dateOfBirth,
    gender,
    address,
    designation,
    description,
    fiverrUrl,
    upworkUrl,
    githubUrl,
    facebookUrl,
    instagramUrl,
    linkedInUrl,
  } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  } else if (!email) {
    res.status(400);
    throw new Error("Email is required");
  } else if (!password) {
    res.status(400);
    throw new Error("Password is required");
  } else if (!gender) {
    res.status(400);
    throw new Error("Gender is required");
  } else if (!companyCode) {
    res.status(400);
    throw new Error("Company Code is required");
  } else {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      skill,
      companyCode,
      phone,
      dateOfBirth,
      gender,
      address,
      designation,
      description,
      fiverrUrl,
      upworkUrl,
      githubUrl,
      facebookUrl,
      instagramUrl,
      linkedInUrl,
    });
    if (user) {
      generateToken(res, user._id);
      sendGreetingsMail(user.email, user);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        address: user.address,
        isAdmin: user.isAdmin,
        skill: user.skill,
        companyCode: user.companyCode,
        designation: user.designation,
        description: user.description,
        fiverrUrl: user.fiverrUrl,
        upworkUrl: user.upworkUrl,
        githubUrl: user.githubUrl,
        facebookUrl: user.facebookUrl,
        instagramUrl: user.instagramUrl,
        linkedInUrl: user.linkedInUrl,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      address: user.address,
      isAdmin: user.isAdmin,
      skill: user.skill,
      companyCode: user.companyCode,
      designation: user.designation,
      description: user.description,
      fiverrUrl: user.fiverrUrl,
      upworkUrl: user.upworkUrl,
      githubUrl: user.githubUrl,
      facebookUrl: user.facebookUrl,
      instagramUrl: user.instagramUrl,
      linkedInUrl: user.linkedInUrl,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
 console.log("gggggggggggggg", req.body)
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.phone = req.body.phone || user.phone;
    user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
    user.gender = req.body.gender || user.gender;
    user.address = req.body.address || user.address;
    user.skill = req.body.skill || user.skill;
    user.designation = req.body.designation || user.designation;
    user.description = req.body.description || user.description;
    user.fiverrUrl = req.body.fiverrUrl || user.fiverrUrl;
    user.upworkUrl = req.body.upworkUrl || user.upworkUrl;
    user.githubUrl = req.body.githubUrl || user.githubUrl;
    user.facebookUrl = req.body.facebookUrl || user.facebookUrl;
    user.instagramUrl = req.body.instagramUrl || user.instagramUrl;
    user.linkedInUrl = req.body.linkedInUrl || user.linkedInUrl;


    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
// const getUserById = asyncHandler(async (req, res) => {

//   console.log("lllllllllllllllllll")

//   const user = await User.findById(req.params.id).select("-password");

//   if (user) {
//     res.status(200).json(user);
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Find education, experience, and projects associated with the user
  const [education, experience, projects] = await Promise.all([
    Education.find({ user: user._id }),
    Experience.find({ user: user._id }),
    Project.find({ user: user._id }),
  ]);

  res.status(200).json({
    user,
    education,
    experience,
    projects,
  });
});

// @desc    Get member user
// @route   GET /api/users
// @access  public
const getMemberUser = asyncHandler(async (req, res) => {
  const user = await User.find({ isTeamMember: true }).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(404);
      throw new Error("Cannot delete admin user");
    }
    let isDelete = await User.deleteOne({ _id: user._id });
    if(isDelete){
      res.status(200).json({ message: "User deleted successfully" });
    }else{
      res.status(401).json({ message: "Something when wrong" });
    }
  
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  
  console.log("ssssssssssssssssss", req.body)
  const user = await User.findById(req.params.id);

  if (user) {
    user.isAdmin = Boolean(req.body.isAdmin);
    user.isTeamMember = Boolean(req.body.isTeamMember);

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isTeamMember: updatedUser.isTeamMember,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getMemberUser,
  deleteUser,
  getUserById,
  updateUser,
};
