import asyncHandler from "../middleware/asyncHandler.js";
import Blog from "../models/blogModel.js";


// @desc    Fetch all Blogs with associated Users
// @route   GET /api/Blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).populate('user', 'name image email ');
  res.status(200).json(blogs);
});

// @desc    Fetch all Active Blogs
// @route   GET /api/blogs
// @access  Public
const getActiveBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ isActive: true }).populate('user', 'name image email');;
  if (blogs) {
    res.status(200).json(blogs);
  } else {
    res.status(404);
    throw new Error("Active Blogs not found");
  }
});

// @desc    Fetch a single Product by id
// @route   GET /api/blog/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', 'name image email');;;
  if (blog) {
    return res.json(blog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// @desc    Create Blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog({
    user: req.user._id,
    title: "facebook",
    image: "/images/sample.jpg",
    content:
      "A user is a casual name given to an individual who interacts with a website, online service, app or platform in any way. For example, the user of a website is someone who visits the site. The user of a mobile app is someone who downloads the mobile app.",
    isActive: false,
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', 'name image email');;

  if (blog) {
    await Blog.deleteOne({ _id: blog._id });
    res.status(200).json({ message: "Blog deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Update Blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const {title, image, content, isActive } = req.body;

  const blog = await Blog.findById(req.params.id).populate('user', 'name image email');;
  if (blog) {
    blog.title = title;
    blog.image = image;
    blog.content = content;
    blog.isActive = isActive;
    const updateBlog = await blog.save();
    res.status(200).json(updateBlog);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {
  getBlogs,
  getActiveBlogs,
  getBlogById,
  updateBlog,
  createBlog,
  deleteBlog,
};
