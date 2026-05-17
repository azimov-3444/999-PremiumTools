import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Mapped from Supabase UUID
    email: { type: String, required: true, unique: true },
    first_name: String,
    last_name: String,
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'moderator', 'admin', 'super_admin'] },
    created_at: { type: Date, default: Date.now }
});

const CategorySchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    name_uz: String,
    name_ru: String,
    name_en: String,
    created_at: { type: Date, default: Date.now }
});

const ProductSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    name_uz: String,
    name_ru: String,
    name_en: String,
    price: { type: Number, required: true },
    category_id: { type: Number },
    image: String,
    images: [{ url: String, is_primary: Boolean }],
    stock: { type: Number, default: 0 },
    in_stock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    best_seller: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    unit: { type: String, default: 'piece' },
    description: String,
    description_uz: String,
    description_ru: String,
    description_en: String,
    created_at: { type: Date, default: Date.now }
});

const ReviewSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    product_id: { type: Number },
    user_name: { type: String, required: true },
    user_email: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const CarouselItemSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    title_uz: String,
    title_ru: String,
    title_en: String,
    description: String,
    description_uz: String,
    description_ru: String,
    description_en: String,
    image: { type: String, required: true },
    button_text: String,
    button_text_uz: String,
    button_text_ru: String,
    button_text_en: String,
    link: String,
    created_at: { type: Date, default: Date.now }
});

const VisitStatSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    session_id: { type: String, required: true },
    path: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Auto-increment logic for ID fields since we migrated from relational DB where IDs were sequential ints
// For new inserts, we will manually assign the next ID in controllers, or use a pre-save hook.
// To keep it simple, we'll assign the highest id + 1 in controllers when inserting new documents.

export const User = mongoose.model('users', UserSchema);
export const Category = mongoose.model('categories', CategorySchema);
export const Product = mongoose.model('products', ProductSchema);
export const Review = mongoose.model('reviews', ReviewSchema);
export const CarouselItem = mongoose.model('carousel_items', CarouselItemSchema);
export const VisitStat = mongoose.model('visit_stats', VisitStatSchema);
