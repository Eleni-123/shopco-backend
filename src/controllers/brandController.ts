import { Request, Response } from "express";
import Brand from "../models/Brand";

// Get all brands
export const getAllBrands = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const brands = await Brand.find();

    res.status(200).json({
      success: true,
      count: brands.length,
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching brands",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get single brand by ID
export const getBrandById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      res.status(404).json({
        success: false,
        message: "Brand not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching brand",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
