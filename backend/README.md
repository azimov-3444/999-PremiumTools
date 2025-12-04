# 999 Premium Tools Backend API

Python FastAPI backend with PostgreSQL database.

## 🚀 Local Development

### 1. Install Python dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Setup PostgreSQL Database

Install PostgreSQL va yangi database yarating:

```sql
CREATE DATABASE premium_tools;
```

### 3. Configure environment variables

`.env` fayl yarating:

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/premium_tools
SECRET_KEY=your-secret-key
```

### 4. Run the server

```bash
python main.py
```

Yoki:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server ishga tushadi: **http://localhost:8000**

API Documentation: **http://localhost:8000/docs**

## 📡 API Endpoints

### Users
- `POST /api/users/register` - Ro'yxatdan o'tish
- `POST /api/users/login` - Kirish
- `GET /api/users` - Barcha foydalanuvchilar
- `PATCH /api/users/{email}/role` - Rolni o'zgartirish

### Categories
- `GET /api/categories` - Barcha kategoriyalar
- `POST /api/categories` - Yangi kategoriya
- `DELETE /api/categories/{id}` - Kategoriyani o'chirish

### Products
- `GET /api/products` - Barcha mahsulotlar
- `POST /api/products` - Yangi mahsulot
- `PATCH /api/products/{id}` - Mahsulotni yangilash
- `DELETE /api/products/{id}` - Mahsulotni o'chirish

### Carousel
- `GET /api/carousel` - Barcha bannerlar
- `POST /api/carousel` - Yangi banner
- `DELETE /api/carousel/{id}` - Bannerni o'chirish

### Statistics
- `POST /api/stats/visit` - Tashrifni qayd qilish
- `GET /api/stats` - Statistika

## 🌐 Production Deployment (Render.com)

### 1. Create PostgreSQL database on Render

1. Render.com ga kiring
2. "New +" → "PostgreSQL" tanlang
3. Database yarating
4. Connection string ni ko'chirib oling

### 2. Create Web Service

1. "New +" → "Web Service"
2. GitHub repository ni ulang
3. Settings:
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables**:
     - `DATABASE_URL`: (Render PostgreSQL connection string)
     - `SECRET_KEY`: (random string)

### 3. Deploy!

Render avtomatik deploy qiladi. Backend URL ni oling (masalan: `https://your-app.onrender.com`)

## 🔗 Frontend Integration

Frontend da API URL ni o'zgartiring:

```javascript
const API_URL = "https://your-app.onrender.com/api";
```

## ✅ Testing

API ni test qilish uchun:

```bash
curl http://localhost:8000/
```

Yoki brauzerda: **http://localhost:8000/docs** (Swagger UI)
