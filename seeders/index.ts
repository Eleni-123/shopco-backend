import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product";
import Brand from "../models/Brand";
import Category from "../models/Category";
import Review from "../models/Review";
import Order from "../models/Order";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

const categories = ["Casual", "Formal", "Party", "Gym"];
const types = ["T-shirt", "shorts", "shirts", "hoodie", "jeans"];
const brands = [
  "Nike",
  "Adidas",
  "Puma",
  "Reebok",
  "Under Armour",
  "Levis",
  "Zara",
  "H&M",
];
const sizes = ["small", "medium", "large", "x-large"];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomRating() {
  return Math.round((Math.random() * 4 + 1) * 10) / 10;
}

function getRandomPrice() {
  return Math.floor(Math.random() * 100) + 20;
}

function getRandomDiscount() {
  return Math.floor(Math.random() * 30);
}

function getRandomImages() {
  return [
    "https://source.unsplash.com/random/400x400?sig=" +
      Math.floor(Math.random() * 1000),
    "https://source.unsplash.com/random/400x400?sig=" +
      Math.floor(Math.random() * 1000),
  ];
}

function getRandomFaqs() {
  return [
    {
      question: "Is this product washable?",
      answer: "Yes, it is machine washable.",
    },
    { question: "Is there a warranty?", answer: "1 year warranty included." },
  ];
}

function getRandomReview(productId: mongoose.Types.ObjectId) {
  return {
    product: productId,
    user: "user" + Math.floor(Math.random() * 1000),
    rating: getRandomRating(),
    comment: "Great product! " + Math.random().toString(36).substring(7),
    createdAt: new Date(),
  };
}

async function seed() {
  await mongoose.connect(MONGO_URI);
  await Product.deleteMany({});
  await Brand.deleteMany({});
  await Category.deleteMany({});
  await Review.deleteMany({});
  await Order.deleteMany({});

  // Seed categories
  const categoryDocs = await Category.insertMany(
    categories.map((name) => ({ name }))
  );
  // Seed brands
  const brandDocs = await Brand.insertMany(brands.map((name) => ({ name })));

  // Seed products
  const products = [];
  for (let i = 0; i < 100; i++) {
    const category = getRandomElement(categoryDocs);
    const brand = getRandomElement(brandDocs);
    const type = getRandomElement(types);
    const product = new Product({
      title: `${brand.name} ${type} #${i + 1}`,
      shortDescription: "A stylish and comfortable " + type,
      color: getRandomColor(),
      rating: getRandomRating(),
      price: getRandomPrice(),
      discount: getRandomDiscount(),
      size: sizes,
      reviews: [],
      longDescription: "This is a long description for the product.",
      images: getRandomImages(),
      faqs: getRandomFaqs(),
      category: category._id,
      type,
      brand: brand._id,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
      purchasedCount: Math.floor(Math.random() * 1000),
    });
    products.push(product);
  }
  const productDocs = await Product.insertMany(products);

  // Seed reviews
  const reviews = [];
  for (const product of productDocs) {
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
      reviews.push(getRandomReview(product._id));
    }
  }
  const reviewDocs = await Review.insertMany(reviews);

  // Attach reviews to products
  for (const review of reviewDocs) {
    await Product.findByIdAndUpdate(review.product, {
      $push: { reviews: review._id },
    });
  }

  // Seed orders
  const orders = [];
  for (let i = 0; i < 30; i++) {
    const orderProducts = [];
    let total = 0;
    for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j++) {
      const product = getRandomElement(productDocs);
      const quantity = Math.floor(Math.random() * 3) + 1;
      orderProducts.push({ product: product._id, quantity });
      total += product.price * quantity;
    }
    orders.push({
      products: orderProducts,
      total,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    });
  }
  await Order.insertMany(orders);

  console.log("Database seeded!");
  process.exit();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
