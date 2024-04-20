import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.status(201).json(products);
});

// @desc    Fetch a single Product by id
// @route   GET /api/Product/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Create Product
// @route   POST /api/products
// @access  Private/Admin
  const createProduct = asyncHandler(async (req, res) => {
    const product = await Product({
        user: req.user._id,
        name: "Sample",
        url: "www.google.com",
        description: "sample description",
        image: "/images/sample.jpg",
    });
  
    const createProduct = await product.save();
    res.status(201).json(createProduct);
  });

// @desc    Update Product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, url, description, image } = req.body;
  
  const product = await Product.findById(req.params.id);
  if (product) {
    user: req.user._id;
    product.name = name;
    product.url = url;
    product.description = description;
    product.image = image;    
    const updateProduct = await product.save();
    res.status(200).json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
  
    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.status(200).json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  });

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  // getTopProducts
};
