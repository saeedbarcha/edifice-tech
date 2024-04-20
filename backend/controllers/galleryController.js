import asyncHandler from "../middleware/asyncHandler.js";
import Gallery from "../models/galleryModel.js";

// @desc    Fetch all Gallary
// @route   GET /api/Gallarys
// @access  Public
const getGallarys = asyncHandler(async (req, res) => {
  const blogs = await Gallery.find({});
  res.status(200).json(blogs);
});

// @desc    Add gallery item
// @route   POST /api/gallery
// @access  Private
const addGalleryItem = asyncHandler(async (req, res) => {
  const { caption, image } = req.body;
  
  // Get user ID from req.user
  const userId = req.user._id;

  try {
    // Create a new gallery instance
    const newGalleryItem = new Gallery({
      user: userId,
      caption,
      image
    });

    // Save the new gallery instance to the database
    const createdGalleryItem = await newGalleryItem.save();

    res.status(201).json(createdGalleryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete experience
// @route   DELETE /api/gallery/:id
// @access  Private admin
const deleteGalleryItem = asyncHandler(async (req, res) => {
  const galleryItem = await Gallery.findById(req.params.id);
  if (galleryItem) {
    await Gallery.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Image deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Image not found");
  }
});

// @desc    Update an existing experience
// @route   PUT /api/experience/:id
// @access  Private
const updateGalleryItem = asyncHandler(async (req, res) => {
  console.log("jjjjjjjjjjjjjjj")
  const { caption, image , isActive } = req.body;

  try {
    let galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      res.status(404);
      throw new Error("Gallery Item not found");
    }

    galleryItem.caption = caption || galleryItem.caption;
    galleryItem.image = image || galleryItem.image;
    galleryItem.isActive = isActive || galleryItem.isActive;

   

    galleryItem = await galleryItem.save();
    res.json(galleryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  getGallarys,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
};
