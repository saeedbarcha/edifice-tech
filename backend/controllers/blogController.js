import asyncHandler from "../middleware/asyncHandler.js";
import Blog from "../models/blogModel.js";


// @desc    Fetch all Blogs with associated Users
// @route   GET /api/Blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? {
    title: {
      $regex: req.query.keyword,
      $options: "i"
    }
  } : {};
  const count = await Blog.countDocuments({...keyword});
  const allBlogs = await Blog.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));

  if (!allBlogs) {
    res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json({ allBlogs, page, pages: Math.ceil(count / pageSize) });
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
    title: "Blog title",
    image: "/images/sample.jpg",
    content:
      "Blog description",
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
