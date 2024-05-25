import asyncHandler from "../middleware/asyncHandler.js";
import Gallery from "../models/galleryModel.js";

// @desc    Fetch all Gallary
// @route   GET /api/Gallarys
// @access  Public
const getGallarys = asyncHandler(async (req, res) => {
  const gallerys = await Gallery.find({});
  res.status(200).json(gallerys);
});

// @desc    Fetch all Gallary
// @route   GET /api/Gallarys
// @access  Public
const getActiveGallarys = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? { caption:{$regex: req.query.keyword,
    $options:"i"} } : {};

  const count = await Gallery.countDocuments({...keyword, isActive: true});
  
  const activeGalleries = await Gallery.find({...keyword, isActive: true}).limit(pageSize).skip(pageSize * (page - 1));

  if(!activeGalleries){
    res.status(404).json({ message: "No Image found" });
  }

  res.status(200).json({activeGalleries, page, pages: Math.ceil(count / pageSize)});
});

// @desc    Add gallery item
// @route   POST /api/gallery
// @access  Private
const addGalleryItem = asyncHandler(async (req, res) => {
  const { caption, image } = req.body;
  const userId = req.user._id;

  try {
    const newGalleryItem = new Gallery({
      user: userId,
      caption,
      image
    });

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
  getActiveGallarys,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
};
