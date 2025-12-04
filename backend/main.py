from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from passlib.context import CryptContext
import database
import schemas

# Initialize FastAPI app
app = FastAPI(title="999 Premium Tools API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Production da faqat o'z domeningizni qo'shing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Initialize database
@app.on_event("startup")
def startup():
    database.init_db()

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "999 Premium Tools API", "status": "running"}

# ==================== USER ENDPOINTS ====================

@app.post("/api/users/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # Check if user exists
    db_user = db.query(database.User).filter(database.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    hashed_password = hash_password(user.password)
    db_user = database.User(
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        password=hashed_password,
        role="admin" if user.email == "admin@999.uz" else "user"
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/api/users/login", response_model=schemas.UserResponse)
def login_user(credentials: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(database.User).filter(database.User.email == credentials.email).first()
    if not db_user or not verify_password(credentials.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return db_user

@app.get("/api/users", response_model=List[schemas.UserResponse])
def get_all_users(db: Session = Depends(database.get_db)):
    users = db.query(database.User).all()
    return users

@app.patch("/api/users/{email}/role")
def update_user_role(email: str, role: str, db: Session = Depends(database.get_db)):
    db_user = db.query(database.User).filter(database.User.email == email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.role = role
    db.commit()
    return {"message": "Role updated successfully"}

# ==================== CATEGORY ENDPOINTS ====================

@app.get("/api/categories", response_model=List[schemas.CategoryResponse])
def get_categories(db: Session = Depends(database.get_db)):
    categories = db.query(database.Category).all()
    return categories

@app.post("/api/categories", response_model=schemas.CategoryResponse, status_code=status.HTTP_201_CREATED)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(database.get_db)):
    db_category = database.Category(name=category.name)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@app.delete("/api/categories/{category_id}")
def delete_category(category_id: int, db: Session = Depends(database.get_db)):
    db_category = db.query(database.Category).filter(database.Category.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(db_category)
    db.commit()
    return {"message": "Category deleted successfully"}

# ==================== PRODUCT ENDPOINTS ====================

@app.get("/api/products", response_model=List[schemas.ProductResponse])
def get_products(db: Session = Depends(database.get_db)):
    products = db.query(database.Product).all()
    return products

@app.post("/api/products", response_model=schemas.ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(product: schemas.ProductCreate, db: Session = Depends(database.get_db)):
    db_product = database.Product(
        name=product.name,
        price=product.price,
        category_id=product.category_id,
        image=product.image,
        stock=product.stock,
        in_stock=product.stock > 0
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.patch("/api/products/{product_id}")
def update_product(product_id: int, update: schemas.ProductUpdate, db: Session = Depends(database.get_db)):
    db_product = db.query(database.Product).filter(database.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if update.stock is not None:
        db_product.stock = update.stock
        db_product.in_stock = update.stock > 0
    
    if update.category_id is not None:
        db_product.category_id = update.category_id
    
    db.commit()
    db.refresh(db_product)
    return db_product

@app.delete("/api/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(database.get_db)):
    db_product = db.query(database.Product).filter(database.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted successfully"}

# ==================== CAROUSEL ENDPOINTS ====================

@app.get("/api/carousel", response_model=List[schemas.CarouselItemResponse])
def get_carousel_items(db: Session = Depends(database.get_db)):
    items = db.query(database.CarouselItem).all()
    return items

@app.post("/api/carousel", response_model=schemas.CarouselItemResponse, status_code=status.HTTP_201_CREATED)
def create_carousel_item(item: schemas.CarouselItemCreate, db: Session = Depends(database.get_db)):
    db_item = database.CarouselItem(
        title=item.title,
        description=item.description,
        image=item.image,
        button_text=item.button_text,
        link=item.link
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/api/carousel/{item_id}")
def delete_carousel_item(item_id: int, db: Session = Depends(database.get_db)):
    db_item = db.query(database.CarouselItem).filter(database.CarouselItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Carousel item not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Carousel item deleted successfully"}

# ==================== VISIT STATS ENDPOINTS ====================

@app.post("/api/stats/visit", status_code=status.HTTP_201_CREATED)
def track_visit(visit: schemas.VisitStatCreate, db: Session = Depends(database.get_db)):
    db_visit = database.VisitStat(
        session_id=visit.session_id,
        path=visit.path
    )
    db.add(db_visit)
    db.commit()
    return {"message": "Visit tracked"}

@app.get("/api/stats", response_model=schemas.VisitStatsAggregated)
def get_visit_stats(db: Session = Depends(database.get_db)):
    visits = db.query(database.VisitStat).all()
    unique_sessions = set(visit.session_id for visit in visits)
    
    return {
        "total_visits": len(visits),
        "unique_visitors": len(unique_sessions),
        "page_views": visits
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
