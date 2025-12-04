import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { hashPassword, verifyPassword } from './utils/passwordUtils';
import { initialCategories, initialProducts } from './data/initialData';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Catalog from './components/Catalog';
import Cart from './components/Cart';
import Favourites from './components/Favourites';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import About from './components/About';
import Contact from './components/Contact';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [users, setUsers] = useLocalStorage('users', []);
  const [categories, setCategories] = useLocalStorage('categories', initialCategories);
  const [products, setProducts] = useLocalStorage('products', initialProducts);
  const [cart, setCart] = useLocalStorage('cart', []);
  const [favourites, setFavourites] = useLocalStorage('favourites', []);
  const [visitStats, setVisitStats] = useLocalStorage('visitStats', {
    totalVisits: 0,
    uniqueVisitors: [],
    pageViews: []
  });

  const [carouselItems, setCarouselItems] = useLocalStorage('carouselItems', [
    {
      id: 1,
      title: 'Professional zargarlik asboblari',
      description: 'Yuqori sifatli va ishonchli vositalar',
      image: 'https://images.unsplash.com/photo-1589128777073-263566fd5ea2?auto=format&fit=crop&q=80&w=2000',
      buttonText: 'Katalogga o\'tish',
      link: '/catalog'
    },
    {
      id: 2,
      title: 'Mustahkam va sifatli uskunalar',
      description: 'Uzoq yillar xizmat qiladi',
      image: 'https://images.unsplash.com/photo-1621905251189-fc015acafd31?auto=format&fit=crop&q=80&w=2000',
      buttonText: 'Batafsil',
      link: '/about'
    },
    {
      id: 3,
      title: '999 Premium Tools — Sizning ishonchli do\'koningiz',
      description: 'Har qanday zargarlik ishlariga mos',
      image: 'https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&q=80&w=2000',
      buttonText: 'Bog\'lanish',
      link: '/contact'
    }
  ]);

  // Track visits
  useEffect(() => {
    const sessionId = sessionStorage.getItem('sessionId') || Date.now().toString();
    if (!sessionStorage.getItem('sessionId')) {
      sessionStorage.setItem('sessionId', sessionId);
    }

    const currentPath = location.pathname;
    const timestamp = new Date().toISOString();

    // Check if this is a unique visitor
    const isUniqueVisitor = !visitStats.uniqueVisitors.some(v => v.sessionId === sessionId);

    setVisitStats(prev => ({
      totalVisits: prev.totalVisits + 1,
      uniqueVisitors: isUniqueVisitor
        ? [...prev.uniqueVisitors, { sessionId, firstVisit: timestamp }]
        : prev.uniqueVisitors,
      pageViews: [...prev.pageViews, { path: currentPath, timestamp, sessionId }]
    }));
  }, [location.pathname]);

  // Handle login/register
  const handleLogin = (formData, isRegister) => {
    if (isRegister) {
      // Check if user already exists
      if (users.find(u => u.email === formData.email)) {
        return false;
      }

      // Create new user
      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: hashPassword(formData.password),
        role: formData.email === 'admin@999.uz' ? 'admin' : 'user',
        registeredAt: new Date().toISOString(),
      };

      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      navigate('/');
      return true;
    } else {
      // Login - verify hashed password
      const user = users.find(u => u.email === formData.email);

      if (user && verifyPassword(formData.password, user.password)) {
        setCurrentUser(user);
        navigate('/');
        return true;
      }
      return false;
    }
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  // Navigate
  const handleNavigate = (page) => {
    navigate('/' + page);
  };

  // Add to cart
  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.productId === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { productId: product.id, quantity: 1 }]);
    }
  };

  // Update cart quantity
  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.productId !== productId));
    } else {
      setCart(cart.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  // Remove from cart
  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  // Toggle favourite
  const handleToggleFavourite = (productId) => {
    if (favourites.includes(productId)) {
      setFavourites(favourites.filter(id => id !== productId));
    } else {
      setFavourites([...favourites, productId]);
    }
  };

  // Admin: Add category
  const handleAddCategory = (name) => {
    const newCategory = {
      id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
      name: name,
    };
    setCategories([...categories, newCategory]);
  };

  // Admin: Delete category
  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(c => c.id !== categoryId));
  };

  // Admin: Add product
  const handleAddProduct = (productData) => {
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      ...productData,
    };
    setProducts([...products, newProduct]);
  };

  // Admin: Delete product
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  // Admin: Update product stock
  const handleUpdateProductStock = (productId, newStock) => {
    setProducts(products.map(product =>
      product.id === productId
        ? { ...product, stock: newStock, inStock: newStock > 0 }
        : product
    ));
  };

  // Admin: Update user role
  const handleUpdateUserRole = (email, role) => {
    setUsers(users.map(user =>
      user.email === email ? { ...user, role } : user
    ));

    // Update current user if it's them
    if (currentUser && currentUser.email === email) {
      setCurrentUser({ ...currentUser, role });
    }
  };

  // Admin: Update product category
  const handleUpdateProductCategory = (productId, newCategoryId) => {
    setProducts(products.map(product =>
      product.id === productId
        ? { ...product, categoryId: newCategoryId }
        : product
    ));
  };

  // Admin: Add carousel item
  const handleAddCarouselItem = (item) => {
    const newItem = {
      id: Date.now(),
      ...item
    };
    setCarouselItems([...carouselItems, newItem]);
  };

  // Admin: Delete carousel item
  const handleDeleteCarouselItem = (id) => {
    setCarouselItems(carouselItems.filter(item => item.id !== id));
  };

  // Protected admin route
  const ProtectedAdminRoute = ({ children }) => {
    if (!currentUser || currentUser.role !== 'admin') {
      return (
        <div className="bg-gray-50 min-h-screen py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-md mx-auto">
              <svg className="w-24 h-24 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Ruxsat yo'q!</h2>
              <p className="text-gray-600 mb-6">Bu sahifaga faqat adminlar kirishi mumkin.</p>
              <button
                onClick={() => navigate('/')}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Bosh sahifaga qaytish
              </button>
            </div>
          </div>
        </div>
      );
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        favouritesCount={favourites.length}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              categories={categories}
              onAddToCart={handleAddToCart}
              onToggleFavourite={handleToggleFavourite}
              favourites={favourites}
              onNavigate={handleNavigate}
              carouselItems={carouselItems}
            />
          }
        />

        <Route
          path="/catalog"
          element={
            <Catalog
              products={products}
              categories={categories}
              onAddToCart={handleAddToCart}
              onToggleFavourite={handleToggleFavourite}
              favourites={favourites}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              products={products}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveFromCart={handleRemoveFromCart}
            />
          }
        />

        <Route
          path="/favourites"
          element={
            <Favourites
              favourites={favourites}
              products={products}
              onAddToCart={handleAddToCart}
              onToggleFavourite={handleToggleFavourite}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              onLogin={handleLogin}
              onNavigate={handleNavigate}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel
                categories={categories}
                products={products}
                users={users}
                onAddCategory={handleAddCategory}
                onDeleteCategory={handleDeleteCategory}
                onAddProduct={handleAddProduct}
                onUpdateUserRole={handleUpdateUserRole}
                onDeleteProduct={handleDeleteProduct}
                onUpdateProductStock={handleUpdateProductStock}
                onUpdateProductCategory={handleUpdateProductCategory}
                carouselItems={carouselItems}
                onAddCarouselItem={handleAddCarouselItem}
                onDeleteCarouselItem={handleDeleteCarouselItem}
                visitStats={visitStats}
              />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
