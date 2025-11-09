# MongoDB Setup Instructions

## You need to start MongoDB before running the seeder or server!

### Quick Check: Is MongoDB Running?

Open **MongoDB Compass** and try connecting to:
```
mongodb://localhost:27017
```

If it connects successfully, MongoDB is running! ✅

---

## How to Start MongoDB

### Method 1: MongoDB Compass (Recommended)
1. Open **MongoDB Compass**
2. The connection string should be: `mongodb://localhost:27017`
3. Click "Connect"
4. If it connects, you're ready to go!

### Method 2: Windows Service
Open PowerShell as Administrator and run:
```powershell
net start MongoDB
```

### Method 3: Manual Start
If MongoDB is not installed as a service, you need to start it manually:

1. Open PowerShell
2. Navigate to MongoDB bin directory (adjust path if different):
   ```powershell
   cd "C:\Program Files\MongoDB\Server\7.0\bin"
   ```
3. Start MongoDB:
   ```powershell
   .\mongod.exe --dbpath "C:\data\db"
   ```
   
   **Note**: Make sure the data directory exists. If not, create it:
   ```powershell
   mkdir C:\data\db
   ```

---

## After MongoDB is Running

### 1. Seed the Database
```bash
npm run seed
```

### 2. Start the Server
```bash
npm run dev
```

### 3. Test the API
Open browser: http://localhost:5000/api/products/new-arrivals

---

## Still Having Issues?

### Error: "ECONNREFUSED ::1:27017"
This means MongoDB is not running. Try one of the methods above.

### Error: "Service name is invalid"
MongoDB is not installed as a Windows service. Use Method 3 (Manual Start) instead.

### MongoDB Compass Won't Connect
1. Check if MongoDB process is running in Task Manager (look for "mongod")
2. Try starting MongoDB manually (Method 3)
3. Make sure no firewall is blocking port 27017
