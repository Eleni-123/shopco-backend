import express from "express";
import { getAllReviews } from "../controllers/reviewsController";

const router = express.Router();

// Standard routes
router.get("/", getAllReviews);

export default router;
