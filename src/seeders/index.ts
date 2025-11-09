import dotenv from "dotenv";
import connectDB from "../config/database";
import Category from "../models/Category";
import Brand from "../models/Brand";
import Product from "../models/Product";
import Review from "../models/Review";
import Order from "../models/Order";

dotenv.config();

// Categories data
const categories = [
  { name: "Casual", slug: "casual", description: "Comfortable everyday wear" },
  {
    name: "Formal",
    slug: "formal",
    description: "Professional and elegant attire",
  },
  {
    name: "Party",
    slug: "party",
    description: "Stylish outfits for celebrations",
  },
  { name: "Gym", slug: "gym", description: "Athletic and workout clothing" },
];

// Brands data
const brands = [
  { name: "Nike", slug: "nike", description: "Just Do It" },
  { name: "Adidas", slug: "adidas", description: "Impossible is Nothing" },
  { name: "Puma", slug: "puma", description: "Forever Faster" },
  { name: "Zara", slug: "zara", description: "Fashion forward clothing" },
  {
    name: "H&M",
    slug: "hm",
    description: "Fashion and quality at the best price",
  },
  {
    name: "Levi's",
    slug: "levis",
    description: "Quality never goes out of style",
  },
  {
    name: "Ralph Lauren",
    slug: "ralph-lauren",
    description: "Timeless American style",
  },
  {
    name: "Tommy Hilfiger",
    slug: "tommy-hilfiger",
    description: "Classic American cool",
  },
  {
    name: "Calvin Klein",
    slug: "calvin-klein",
    description: "Modern minimalist style",
  },
  { name: "Gap", slug: "gap", description: "Casual American style" },
];

// Product generation helpers
const colors = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#0000FF",
  "#00FF00",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#808080",
  "#FFA500",
  "#800080",
  "#FFC0CB",
  "#A52A2A",
  "#008080",
];
const sizes = [
  ["Small", "Medium", "Large", "X-Large"],
  ["Medium", "Large", "X-Large"],
  ["Small", "Medium", "Large"],
];
const types: Array<"T-shirt" | "Shorts" | "Shirts" | "Hoodie" | "Jeans"> = [
  "T-shirt",
  "Shorts",
  "Shirts",
  "Hoodie",
  "Jeans",
];

const productTitles = {
  "T-shirt": [
    "Classic Cotton T-Shirt",
    "Vintage Graphic Tee",
    "Premium V-Neck",
    "Striped Crew Neck",
    "Athletic Performance Tee",
    "Pocket T-Shirt",
    "Long Sleeve Tee",
    "Henley Shirt",
    "Polo T-Shirt",
    "Oversized Fit Tee",
    "Slim Fit T-Shirt",
    "Basic Crew Neck",
    "Designer Logo Tee",
    "Vintage Wash T-Shirt",
    "Performance Mesh Tee",
    "Raglan Sleeve Tee",
    "Gradient Print Tee",
    "Typography T-Shirt",
    "Color Block Tee",
    "Embroidered Logo Shirt",
  ],
  Shorts: [
    "Athletic Running Shorts",
    "Cargo Shorts",
    "Denim Shorts",
    "Chino Shorts",
    "Performance Training Shorts",
    "Board Shorts",
    "Basketball Shorts",
    "Gym Shorts",
    "Casual Bermuda Shorts",
    "Jogger Shorts",
    "Sweat Shorts",
    "Athletic Mesh Shorts",
    "Drawstring Shorts",
    "Pleated Shorts",
    "Khaki Shorts",
    "Jean Shorts",
    "Compression Shorts",
    "Running Split Shorts",
    "Hybrid Shorts",
    "Quick-Dry Shorts",
  ],
  Shirts: [
    "Oxford Button-Down",
    "Linen Casual Shirt",
    "Flannel Shirt",
    "Dress Shirt",
    "Hawaiian Print Shirt",
    "Chambray Work Shirt",
    "Denim Shirt",
    "Plaid Flannel",
    "Poplin Dress Shirt",
    "Short Sleeve Button-Up",
    "Western Shirt",
    "Military Shirt",
    "Slim Fit Dress Shirt",
    "Classic White Shirt",
    "Striped Business Shirt",
    "Casual Linen Blend",
    "Corduroy Shirt",
    "Checked Pattern Shirt",
    "Silk Dress Shirt",
    "Performance Dress Shirt",
  ],
  Hoodie: [
    "Classic Pullover Hoodie",
    "Zip-Up Fleece Hoodie",
    "Oversized Hoodie",
    "Athletic Hoodie",
    "Tech Fleece Hoodie",
    "Graphic Print Hoodie",
    "Sherpa Lined Hoodie",
    "Lightweight Hoodie",
    "Performance Hoodie",
    "Color Block Hoodie",
    "Distressed Hoodie",
    "Cropped Hoodie",
    "Premium Cotton Hoodie",
    "Logo Embroidered Hoodie",
    "Half-Zip Hoodie",
    "Thermal Hoodie",
    "Vintage Wash Hoodie",
    "Streetwear Hoodie",
    "Designer Hoodie",
    "Recycled Material Hoodie",
  ],
  Jeans: [
    "Slim Fit Jeans",
    "Relaxed Fit Jeans",
    "Skinny Jeans",
    "Bootcut Jeans",
    "Straight Leg Jeans",
    "Distressed Jeans",
    "Dark Wash Jeans",
    "Light Wash Jeans",
    "Stretch Denim Jeans",
    "Vintage Jeans",
    "Tapered Jeans",
    "Wide Leg Jeans",
    "Ripped Jeans",
    "Raw Denim Jeans",
    "High-Waisted Jeans",
    "Athletic Fit Jeans",
    "Selvedge Denim Jeans",
    "Acid Wash Jeans",
    "Black Jeans",
    "Carpenter Jeans",
  ],
};

const faqs = [
  {
    question: "What is the material?",
    answer: "Made from high-quality cotton blend for maximum comfort.",
  },
  {
    question: "How should I wash this?",
    answer: "Machine wash cold with like colors. Tumble dry low.",
  },
  {
    question: "Is this true to size?",
    answer:
      "Yes, this item fits true to size. Check our size guide for details.",
  },
  {
    question: "Where is this made?",
    answer: "Ethically manufactured in our certified facilities.",
  },
  {
    question: "What is the return policy?",
    answer: "30-day returns with tags attached and original packaging.",
  },
];

const reviewComments = [
  "Great quality and fits perfectly!",
  "Love the color and material. Very comfortable.",
  "Exactly as described. Fast shipping!",
  "Good value for money. Highly recommend.",
  "Nice product but runs a bit small.",
  "Excellent quality! Will buy again.",
  "Perfect for everyday wear.",
  "Comfortable and stylish!",
  "Good fit and great price.",
  "Very satisfied with this purchase!",
];

const firstNames = [
  "John",
  "Sarah",
  "Michael",
  "Emma",
  "David",
  "Olivia",
  "James",
  "Sophia",
  "Robert",
  "Isabella",
  "William",
  "Mia",
  "Thomas",
  "Charlotte",
  "Daniel",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Wilson",
  "Anderson",
  "Taylor",
  "Thomas",
  "Moore",
];

const getRandom = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];
const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (
  min: number,
  max: number,
  decimals: number = 2
): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log("Clearing existing data...");
    await Category.deleteMany({});
    await Brand.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    await Order.deleteMany({});

    // Seed Categories
    console.log("Seeding categories...");
    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories`);

    // Seed Brands
    console.log("Seeding brands...");
    const createdBrands = await Brand.insertMany(brands);
    console.log(`Created ${createdBrands.length} brands`);

    // Seed Products
    console.log("Seeding products...");
    const products = [];

    for (let i = 0; i < 100; i++) {
      const type = getRandom(types);
      const category = getRandom(createdCategories);
      const brand = getRandom(createdBrands);
      const titleList = productTitles[type];
      const title = `${getRandom(titleList)} ${i + 1}`;

      const product = {
        title,
        shortDescription: `Premium ${type.toLowerCase()} perfect for ${category.name.toLowerCase()} occasions. Crafted with attention to detail.`,
        longDescription: `Experience unmatched comfort and style with this ${type.toLowerCase()}. Made from premium materials, this piece is designed to last. Whether you're dressing for ${category.name.toLowerCase()} events or everyday wear, this ${type.toLowerCase()} offers the perfect blend of fashion and functionality. Features include reinforced stitching, fade-resistant fabric, and a modern fit that flatters all body types. Available in multiple sizes to ensure the perfect fit for everyone.`,
        color: getRandom(colors),
        rating: getRandomFloat(3.5, 5.0, 1),
        price: getRandomInt(20, 200),
        discount: getRandomInt(0, 50),
        sizes: getRandom(sizes),
        images: [
          `https://picsum.photos/seed/${i}-1/600/800`,
          `https://picsum.photos/seed/${i}-2/600/800`,
          `https://picsum.photos/seed/${i}-3/600/800`,
        ],
        faqs: faqs.slice(0, getRandomInt(2, 5)),
        category: category._id,
        type,
        brand: brand._id,
        purchaseCount: getRandomInt(0, 500),
        createdAt: new Date(
          Date.now() - getRandomInt(0, 90) * 24 * 60 * 60 * 1000
        ), // Random date within last 90 days
      };

      products.push(product);
    }

    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} products`);

    // Seed Reviews
    console.log("Seeding reviews...");
    const reviews = [];

    for (const product of createdProducts) {
      const reviewCount = getRandomInt(3, 15);

      for (let i = 0; i < reviewCount; i++) {
        reviews.push({
          product: product._id,
          user: `${getRandom(firstNames)} ${getRandom(lastNames)}`,
          rating: getRandomFloat(3.0, 5.0, 1),
          comment: getRandom(reviewComments),
          helpful: getRandomInt(0, 50),
        });
      }
    }

    const createdReviews = await Review.insertMany(reviews);
    console.log(`Created ${createdReviews.length} reviews`);

    // Update product ratings based on reviews
    console.log("Updating product ratings...");
    for (const product of createdProducts) {
      const productReviews = createdReviews.filter(
        (r) => (r.product as any).toString() === (product._id as any).toString()
      );
      if (productReviews.length > 0) {
        const avgRating =
          productReviews.reduce((sum, r) => sum + r.rating, 0) /
          productReviews.length;
        await Product.findByIdAndUpdate(product._id, {
          rating: parseFloat(avgRating.toFixed(1)),
        });
      }
    }

    // Seed Orders
    console.log("Seeding orders...");
    const orders = [];

    for (let i = 0; i < 50; i++) {
      const itemCount = getRandomInt(1, 5);
      const orderItems = [];
      let totalAmount = 0;

      for (let j = 0; j < itemCount; j++) {
        const product = getRandom(createdProducts);
        const quantity = getRandomInt(1, 3);
        const price = product.price * (1 - product.discount / 100);

        orderItems.push({
          product: product._id,
          quantity,
          price,
          size: getRandom(product.sizes),
        });

        totalAmount += price * quantity;
      }

      orders.push({
        orderNumber: `ORD-${Date.now()}-${i.toString().padStart(4, "0")}`,
        customer: `${getRandom(firstNames)} ${getRandom(lastNames)}`,
        email: `customer${i}@example.com`,
        items: orderItems,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        status: getRandom(["pending", "processing", "shipped", "delivered"]),
        shippingAddress: {
          street: `${getRandomInt(100, 9999)} Main Street`,
          city: getRandom([
            "New York",
            "Los Angeles",
            "Chicago",
            "Houston",
            "Phoenix",
            "Philadelphia",
          ]),
          state: getRandom(["NY", "CA", "IL", "TX", "AZ", "PA"]),
          zipCode: getRandomInt(10000, 99999).toString(),
          country: "USA",
        },
      });
    }

    const createdOrders = await Order.insertMany(orders);
    console.log(`Created ${createdOrders.length} orders`);

    console.log("\n✅ Database seeded successfully!");
    console.log(`\nSummary:`);
    console.log(`- Categories: ${createdCategories.length}`);
    console.log(`- Brands: ${createdBrands.length}`);
    console.log(`- Products: ${createdProducts.length}`);
    console.log(`- Reviews: ${createdReviews.length}`);
    console.log(`- Orders: ${createdOrders.length}`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
