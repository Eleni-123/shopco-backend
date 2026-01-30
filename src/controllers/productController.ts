import { Request, Response } from "express";
import Product from "../models/Product";
import Review from "../models/Review";

// Get new arrivals (10 most recent products)
export const getNewArrivals = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("category", "name slug")
      .populate("brand", "name slug");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching new arrivals",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get top selling products (10 most purchased)
export const getTopSelling = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const products = await Product.find()
      .sort({ purchaseCount: -1 })
      .limit(10)
      .populate("category", "name slug")
      .populate("brand", "name slug");

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching top selling products",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get all products with optional filtering
export const getAllProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { category, type, brand, minPrice, maxPrice, minRating } = req.query;

    const filter: any = {};

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (brand) filter.brand = brand;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (minRating) filter.rating = { $gte: Number(minRating) };

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .populate("brand", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get single product by ID
export const getProductById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name slug description")
      .populate("brand", "name slug description logo");

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    // Get reviews for this product
    const reviews = await Review.find({ product: product._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: {
        ...product.toObject(),
        reviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get products by category
export const getProductsByCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const products = await Product.find({ category: req.params.categoryId })
      .populate("category", "name slug")
      .populate("brand", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products by category",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get products by type
export const getProductsByType = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const products = await Product.find({ type: req.params.type })
      .populate("category", "name slug")
      .populate("brand", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products by type",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
