import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

// Supabase dan ma'lumotlarni yuklash va real-time yangilanishlarni kuzatish
export function useSupabaseData(tableName, initialData = []) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Ma'lumotlarni yuklash
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: result, error } = await supabase
                    .from(tableName)
                    .select('*')
                    .order('created_at', { ascending: true });

                if (error) throw error;
                setData(result || []);
            } catch (err) {
                console.error(`Error fetching ${tableName}:`, err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Real-time yangilanishlarni kuzatish
        const subscription = supabase
            .channel(`${tableName}_changes`)
            .on('postgres_changes',
                { event: '*', schema: 'public', table: tableName },
                (payload) => {
                    console.log(`${tableName} changed:`, payload);

                    if (payload.eventType === 'INSERT') {
                        setData(prev => [...prev, payload.new]);
                    } else if (payload.eventType === 'UPDATE') {
                        setData(prev => prev.map(item =>
                            item.id === payload.new.id ? payload.new : item
                        ));
                    } else if (payload.eventType === 'DELETE') {
                        setData(prev => prev.filter(item => item.id !== payload.old.id));
                    }
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [tableName]);

    return { data, loading, error, setData };
}

// Foydalanuvchilarni boshqarish
export const useUsers = () => {
    const { data, loading, error } = useSupabaseData('users', []);

    const addUser = async (userData) => {
        try {
            const { data: newUser, error } = await supabase
                .from('users')
                .insert([{
                    email: userData.email,
                    first_name: userData.firstName,
                    last_name: userData.lastName,
                    password: userData.password,
                    role: userData.role || 'user'
                }])
                .select()
                .single();

            if (error) throw error;
            return newUser;
        } catch (err) {
            console.error('Error adding user:', err);
            return null;
        }
    };

    const updateUserRole = async (email, role) => {
        try {
            const { error } = await supabase
                .from('users')
                .update({ role })
                .eq('email', email);

            if (error) throw error;
            return true;
        } catch (err) {
            console.error('Error updating user role:', err);
            return false;
        }
    };

    return { users: data, loading, error, addUser, updateUserRole };
};

// Kategoriyalarni boshqarish
export const useCategories = () => {
    const { data, loading, error } = useSupabaseData('categories', []);

    const addCategory = async (name) => {
        try {
            const { data: newCategory, error } = await supabase
                .from('categories')
                .insert([{ name }])
                .select()
                .single();

            if (error) throw error;
            return newCategory;
        } catch (err) {
            console.error('Error adding category:', err);
            return null;
        }
    };

    const deleteCategory = async (id) => {
        try {
            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (err) {
            console.error('Error deleting category:', err);
            return false;
        }
    };

    return { categories: data, loading, error, addCategory, deleteCategory };
};

// Mahsulotlarni boshqarish
export const useProducts = () => {
    const { data, loading, error } = useSupabaseData('products', []);

    const addProduct = async (productData) => {
        try {
            const { data: newProduct, error } = await supabase
                .from('products')
                .insert([{
                    name: productData.name,
                    price: productData.price,
                    category_id: productData.categoryId,
                    image: productData.image,
                    stock: productData.stock,
                    in_stock: productData.inStock
                }])
                .select()
                .single();

            if (error) throw error;
            return newProduct;
        } catch (err) {
            console.error('Error adding product:', err);
            return null;
        }
    };

    const deleteProduct = async (id) => {
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (err) {
            console.error('Error deleting product:', err);
            return false;
        }
    };

    const updateProductStock = async (id, stock) => {
        try {
            const { error } = await supabase
                .from('products')
                .update({ stock, in_stock: stock > 0 })
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (err) {
            console.error('Error updating product stock:', err);
            return false;
        }
    };

    const updateProductCategory = async (id, categoryId) => {
        try {
            const { error } = await supabase
                .from('products')
                .update({ category_id: categoryId })
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (err) {
            console.error('Error updating product category:', err);
            return false;
        }
    };

    return {
        products: data,
        loading,
        error,
        addProduct,
        deleteProduct,
        updateProductStock,
        updateProductCategory
    };
};

// Karusel/Banner boshqarish
export const useCarouselItems = () => {
    const { data, loading, error } = useSupabaseData('carousel_items', []);

    const addCarouselItem = async (itemData) => {
        try {
            const { data: newItem, error } = await supabase
                .from('carousel_items')
                .insert([{
                    title: itemData.title,
                    description: itemData.description,
                    image: itemData.image,
                    button_text: itemData.buttonText,
                    link: itemData.link
                }])
                .select()
                .single();

            if (error) throw error;
            return newItem;
        } catch (err) {
            console.error('Error adding carousel item:', err);
            return null;
        }
    };

    const deleteCarouselItem = async (id) => {
        try {
            const { error } = await supabase
                .from('carousel_items')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return true;
        } catch (err) {
            console.error('Error deleting carousel item:', err);
            return false;
        }
    };

    return { carouselItems: data, loading, error, addCarouselItem, deleteCarouselItem };
};

// Tashrif statistikasini saqlash
export const trackVisit = async (sessionId, path) => {
    try {
        const { error } = await supabase
            .from('visit_stats')
            .insert([{
                session_id: sessionId,
                path: path
            }]);

        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Error tracking visit:', err);
        return false;
    }
};

// Statistikani olish
export const useVisitStats = () => {
    const [stats, setStats] = useState({
        totalVisits: 0,
        uniqueVisitors: 0,
        pageViews: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data, error } = await supabase
                    .from('visit_stats')
                    .select('*')
                    .order('timestamp', { ascending: false });

                if (error) throw error;

                const uniqueSessions = new Set(data.map(v => v.session_id));

                setStats({
                    totalVisits: data.length,
                    uniqueVisitors: uniqueSessions.size,
                    pageViews: data
                });
            } catch (err) {
                console.error('Error fetching stats:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();

        // Real-time yangilanish
        const subscription = supabase
            .channel('visit_stats_changes')
            .on('postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'visit_stats' },
                () => {
                    fetchStats();
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { stats, loading };
};
