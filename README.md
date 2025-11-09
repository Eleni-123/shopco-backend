# Product API - Node.js Express Backend

A comprehensive TypeScript-based Express backend server for managing products, designed for React frontend integration.

## 🚀 Quick Start

### 1. Start MongoDB
Make sure MongoDB is running. You can:
- Open **MongoDB Compass** and connect to `mongodb://localhost:27017`
- Or start MongoDB service: `net start MongoDB`
- Or run MongoDB manually: `mongod --dbpath "C:\data\db"`

### 2. Install Dependencies
```bash
npm install
```

### 3. Seed the Database (100+ products)
```bash
npm run seed
```

### 4. Start the Server
```bash
npm run dev
```

Server runs on: **http://localhost:5000**

---

## 📋 Features

- 🛍️ **100+ Products** with detailed attributes
- ⭐ **Reviews System** with ratings
- 🏷️ **Categories**: Casual, Formal, Party, Gym
- 👔 **Product Types**: T-shirt, Shorts, Shirts, Hoodie, Jeans
- 🔖 **10 Brands**: Nike, Adidas, Puma, Zara, H&M, and more
- 📊 **Special Endpoints**: 
  - `/api/products/new-arrivals` - 10 most recent products
  - `/api/products/top-selling` - 10 most purchased products

---

## 🔌 API Endpoints

### Products

| Endpoint | Description |
|----------|-------------|
| `GET /api/products` | Get all products (with filters) |
| `GET /api/products/new-arrivals` | 10 most recent products |
| `GET /api/products/top-selling` | 10 most purchased products |
| `GET /api/products/:id` | Get product by ID (with reviews) |
| `GET /api/products/category/:categoryId` | Products by category |
| `GET /api/products/type/:type` | Products by type |

### Query Parameters
```
?type=T-shirt&minRating=4&maxPrice=100&category=...&brand=...
```

### Categories & Brands

| Endpoint | Description |
|----------|-------------|
| `GET /api/categories` | Get all categories |
| `GET /api/brands` | Get all brands |

---

## 📦 Product Schema

```typescript
{
  title: string;
  shortDescription: string;
  longDescription: string;
  color: string; // Hex color (#FF5733)
  rating: number; // 1-5
  price: number;
  discount: number; // 0-100%
  sizes: ["Small", "Medium", "Large", "X-Large"];
  images: string[]; // URLs
  faqs: [{ question: string; answer: string }];
  category: ObjectId; // Casual, Formal, Party, Gym
  type: "T-shirt" | "Shorts" | "Shirts" | "Hoodie" | "Jeans";
  brand: ObjectId;
  purchaseCount: number;
  createdAt: Date;
}
```

---

## 💻 Frontend Integration (React)

```javascript
// Get new arrivals
const fetchNewArrivals = async () => {
  const res = await fetch('http://localhost:5000/api/products/new-arrivals');
  const data = await res.json();
  return data.data; // Array of 10 products
};

// Get top selling
const fetchTopSelling = async () => {
  const res = await fetch('http://localhost:5000/api/products/top-selling');
  const data = await res.json();
  return data.data; // Array of 10 products
};

// Get filtered products
const fetchProducts = async (filters) => {
  const params = new URLSearchParams(filters);
  const res = await fetch(`http://localhost:5000/api/products?${params}`);
  const data = await res.json();
  return data.data;
};
```

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** + **Mongoose ORM**
- **CORS** enabled

---

## 📁 Project Structure

```
src/
├── config/
│   └── database.ts          # MongoDB connection
├── controllers/
│   ├── productController.ts # Product logic
│   ├── categoryController.ts
│   └── brandController.ts
├── models/
│   ├── Product.ts           # Mongoose schemas
│   ├── Category.ts
│   ├── Brand.ts
│   ├── Review.ts
│   └── Order.ts
├── routes/
│   ├── productRoutes.ts
│   ├── categoryRoutes.ts
│   └── brandRoutes.ts
├── seeders/
│   └── index.ts             # Database seeder
└── server.ts                # Main entry point
```

---

## 🔧 Scripts

```bash
npm run dev      # Development mode (auto-reload)
npm run build    # Compile TypeScript
npm start        # Production mode
npm run seed     # Seed database with 100+ products
```

---

## ⚠️ Troubleshooting

### MongoDB Connection Error

If you see `ECONNREFUSED` error:

1. **Start MongoDB Compass** and connect to `mongodb://localhost:27017`
2. Or start MongoDB service: `net start MongoDB`
3. Or run: `mongod --dbpath "C:\data\db"`

### Port Already in Use

Change port in `.env`:
```
PORT=3000
```

---

## 📄 License

ISC

A robust Node.js Express backend server built with TypeScript and MongoDB for managing e-commerce products.

## Features

- **TypeScript**: Full TypeScript support for type safety
- **MongoDB & Mongoose**: Database management with popular ORM
- **RESTful API**: Clean and organized API endpoints
- **Product Management**: Complete product catalog with categories, brands, and reviews
- **Data Seeding**: Automated seeder for 100+ products with realistic data

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- CORS enabled
- dotenv for environment variables

## Project Structure

```
product-api/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── models/
│   │   ├── Product.ts           # Product schema
│   │   ├── Category.ts          # Category schema
│   │   ├── Brand.ts             # Brand schema
│   │   ├── Review.ts            # Review schema
│   │   └── Order.ts             # Order schema
│   ├── controllers/
│   │   ├── productController.ts # Product business logic
│   │   ├── categoryController.ts
│   │   └── brandController.ts
│   ├── routes/
│   │   ├── productRoutes.ts     # Product routes
│   │   ├── categoryRoutes.ts
│   │   └── brandRoutes.ts
│   ├── seeders/
│   │   └── index.ts             # Database seeder
│   └── server.ts                # Main application file
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── package.json
└── tsconfig.json
```

## Installation

1. **Clone or navigate to the project directory**

   ```bash
   cd product-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   - Copy `.env.example` to `.env`
   - Update MongoDB URI if needed (default: `mongodb://localhost:27017/product-api`)

4. **Make sure MongoDB is running**
   - Install MongoDB locally or use MongoDB Atlas
   - Default connection: `mongodb://localhost:27017`

## Usage

### Development Mode

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Run Production Build

```bash
npm start
```

### Seed Database

```bash
npm run seed
```

This will create:

- 4 Categories (Casual, Formal, Party, Gym)
- 10 Brands (Nike, Adidas, Puma, etc.)
- 100+ Products with complete data
- 300+ Reviews
- 50 Sample Orders

## API Endpoints

### Products

- `GET /api/products` - Get all products (with optional filters)
  - Query params: `category`, `type`, `brand`, `minPrice`, `maxPrice`, `minRating`
- `GET /api/products/new-arrivals` - Get 10 most recent products
- `GET /api/products/top-selling` - Get 10 most purchased products
- `GET /api/products/:id` - Get single product by ID (includes reviews)
- `GET /api/products/category/:categoryId` - Get products by category
- `GET /api/products/type/:type` - Get products by type

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID

### Brands

- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get brand by ID

## Product Schema

Products include the following fields:

- `title` - Product name
- `shortDescription` - Brief description (max 200 chars)
- `longDescription` - Detailed description
- `color` - Hex color code
- `rating` - Rating from 1-5
- `price` - Product price
- `discount` - Discount percentage (0-100)
- `sizes` - Available sizes (Small, Medium, Large, X-Large)
- `images` - Array of image URLs
- `faqs` - Frequently asked questions
- `category` - Reference to Category (Casual, Formal, Party, Gym)
- `type` - Product type (T-shirt, Shorts, Shirts, Hoodie, Jeans)
- `brand` - Reference to Brand
- `purchaseCount` - Number of purchases (for top-selling)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Example Response

```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "title": "Classic Cotton T-Shirt 1",
      "shortDescription": "Premium t-shirt perfect for casual occasions...",
      "longDescription": "Experience unmatched comfort...",
      "color": "#000000",
      "rating": 4.5,
      "price": 45,
      "discount": 20,
      "sizes": ["Small", "Medium", "Large", "X-Large"],
      "images": ["url1", "url2", "url3"],
      "faqs": [...],
      "category": { "name": "Casual", "slug": "casual" },
      "type": "T-shirt",
      "brand": { "name": "Nike", "slug": "nike" },
      "purchaseCount": 234,
      "createdAt": "2024-11-01T...",
      "updatedAt": "2024-11-01T..."
    }
  ]
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product-api
NODE_ENV=development
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript
- `npm run seed` - Seed database with sample data

## Database Models

### Category

- Casual, Formal, Party, Gym

### Product Types

- T-shirt, Shorts, Shirts, Hoodie, Jeans

### Sizes

- Small, Medium, Large, X-Large

## CORS

CORS is enabled for all origins. Configure in `src/server.ts` if needed for production.

## License

ISC

## Author

Your Name
