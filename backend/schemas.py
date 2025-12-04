from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    role: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Category Schemas
class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Product Schemas
class ProductBase(BaseModel):
    name: str
    price: int
    category_id: int
    image: Optional[str] = None
    stock: int = 0

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    stock: Optional[int] = None
    category_id: Optional[int] = None

class ProductResponse(ProductBase):
    id: int
    in_stock: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Carousel Item Schemas
class CarouselItemBase(BaseModel):
    title: str
    description: str
    image: str
    button_text: Optional[str] = None
    link: Optional[str] = None

class CarouselItemCreate(CarouselItemBase):
    pass

class CarouselItemResponse(CarouselItemBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Visit Stats Schemas
class VisitStatCreate(BaseModel):
    session_id: str
    path: str

class VisitStatResponse(BaseModel):
    id: int
    session_id: str
    path: str
    timestamp: datetime
    
    class Config:
        from_attributes = True

class VisitStatsAggregated(BaseModel):
    total_visits: int
    unique_visitors: int
    page_views: list[VisitStatResponse]
