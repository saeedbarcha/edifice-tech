import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// get all products
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT || 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: "i"
    }
  } : {};
  const count = await Product.countDocuments({...keyword});
  const allProducts = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));

  if (!allProducts) {
    res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ allProducts, page, pages: Math.ceil(count / pageSize) });
});

// get all active products
const getActiveProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT || 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: "i"
    }
  } : {};
  const count = await Product.countDocuments({...keyword, isActive:true});
  const activeProducts = await Product.find({...keyword, isActive:true}).limit(pageSize).skip(pageSize * (page - 1));

  if (!activeProducts) {
    res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ activeProducts, page, pages: Math.ceil(count / pageSize) });
});

// get product by id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// create product
  const createProduct = asyncHandler(async (req, res) => {
    const product = await Product({
        user: req.user._id,
        name: "Sample",
        url: "www.google.com",
        description: "sample description",
        image: "/images/sample.jpg",
        isActive: false
        
    });
  
    const createProduct = await product.save();
    res.status(201).json(createProduct);
  });

// update product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, url, description, image , isActive} = req.body;
  
  const product = await Product.findById(req.params.id);
  if (product) {
    user: req.user._id;
    product.name = name || product.name;
    product.url = url || product.url;
    product.description = description || product.description;
    product.image = image || product.image;
    product.isActive = isActive ;    
    const updateProduct = await product.save();
    res.status(200).json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// delete product
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
  getActiveProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
