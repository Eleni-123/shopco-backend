# 🚀 Quick Setup Guide

## Step 1: Start MongoDB

You have MongoDB installed with MongoDB Compass. Here are your options:

### Option A: Using MongoDB Compass (Easiest)
1. Open **MongoDB Compass**
2. Connect to: `mongodb://localhost:27017`
3. This will ensure MongoDB is running

### Option B: Start MongoDB Service
```powershell
net start MongoDB
```

### Option C: Manual Start
```powershell
mongod --dbpath "C:\data\db"
```

---

## Step 2: Seed Your Database

Run this command to populate your database with **100+ products**:

```bash
npm run seed
```

**Expected Output:**
```
✅ Database seeded successfully!

Summary:
- Categories: 4
- Brands: 10
- Products: 100
- Reviews: 900+
- Orders: 50
```

---

## Step 3: Start Your Server

```bash
npm run dev
```

Server will start on: **http://localhost:5000**

---

## Step 4: Test Your API

Open your browser or use curl:

### New Arrivals (10 most recent products)
http://localhost:5000/api/products/new-arrivals

### Top Selling (10 most purchased products)
http://localhost:5000/api/products/top-selling

### All Products
http://localhost:5000/api/products

---

## 🎯 Integration with React Frontend

```javascript
// Example API calls
const API_BASE = 'http://localhost:5000/api';

// Get new arrivals
const newArrivals = await fetch(`${API_BASE}/products/new-arrivals`).then(r => r.json());

// Get top selling
const topSelling = await fetch(`${API_BASE}/products/top-selling`).then(r => r.json());

// Get filtered products
const tshirts = await fetch(`${API_BASE}/products?type=T-shirt&minRating=4`).then(r => r.json());
```

---

## 📋 Available Product Filters

- **category**: Casual, Formal, Party, Gym
- **type**: T-shirt, Shorts, Shirts, Hoodie, Jeans
- **brand**: (use brand ID from `/api/brands`)
- **minPrice**: number
- **maxPrice**: number
- **minRating**: 1-5

**Example:**
```
/api/products?type=Hoodie&minRating=4.5&maxPrice=150
```

---

## ✅ You're All Set!

Your backend is ready to serve your React frontend with:
- ✅ 100+ products with realistic data
- ✅ Reviews and ratings
- ✅ Categories and brands
- ✅ Special endpoints for new arrivals and top sellers
- ✅ Fully filtered queries
- ✅ TypeScript support
- ✅ MongoDB + Mongoose ORM
