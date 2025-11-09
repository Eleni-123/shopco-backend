import express from "express";
import {
  getNewArrivals,
  getTopSelling,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByType,
} from "../controllers/productController";

const router = express.Router();

// Special routes
router.get("/new-arrivals", getNewArrivals);
router.get("/top-selling", getTopSelling);

// Standard routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/type/:type", getProductsByType);

export default router;
