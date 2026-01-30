import { Request, Response } from "express";
import Review from "../models/Review";

// Get all Reviews with optional filtering
export const getAllReviews = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { product, user, rating, helpful, comment } = req.query;

    const filter: any = {};

    if (product) filter.product = product;
    if (user) filter.user = user;
    if (rating) filter.rating = rating;
    if (helpful) filter.helpful = helpful;
    if (comment) filter.comment = comment;

    const reviews = await Review.find(filter)
      .populate("product", "name slug")
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
