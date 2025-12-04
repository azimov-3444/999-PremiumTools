import React, { useState } from 'react';

const AdminPanel = ({
    categories,
    products,
    users,
    onAddCategory,
    onDeleteCategory,
    onAddProduct,
    onUpdateUserRole,
    onDeleteProduct,
    onUpdateProductStock,
    carouselItems,
    onAddCarouselItem,
    onDeleteCarouselItem,
    onUpdateProductCategory,
    visitStats
}) => {
    const [activeTab, setActiveTab] = useState('users');
    const [newCategory, setNewCategory] = useState('');
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        categoryId: '',
        image: '',
        stock: '',
    });

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCategory.trim()) {
            onAddCategory(newCategory);
            setNewCategory('');
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (newProduct.name && newProduct.price && newProduct.categoryId && newProduct.stock) {
            onAddProduct({
                name: newProduct.name,
                price: parseInt(newProduct.price),
                categoryId: parseInt(newProduct.categoryId),
                image: newProduct.image || null,
                stock: parseInt(newProduct.stock),
                inStock: parseInt(newProduct.stock) > 0,
            });
            setNewProduct({ name: '', price: '', categoryId: '', image: '', stock: '' });
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({ ...newProduct, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStockChange = (productId, newStock) => {
        if (newStock === '') {
            onUpdateProductStock(productId, 0);
            return;
        }
        const stock = parseInt(newStock);
        if (!isNaN(stock) && stock >= 0) {
            onUpdateProductStock(productId, stock);
        }
    };

    const tabs = [
        { id: 'users', name: 'Foydalanuvchilar', icon: '👥' },
        { id: 'products', name: 'Mahsulotlar', icon: '📦' },
        { id: 'categories', name: 'Kategoriyalar', icon: '📁' },
        { id: 'banners', name: 'Bannerlar', icon: '🎨' },
        { id: 'statistics', name: 'Statistika', icon: '📊' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-8 md:py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Admin Panel</h2>

                {/* Tab Navigation */}
                <div className="bg-white rounded-xl shadow-lg mb-6 overflow-x-auto">
                    <div className="flex border-b">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'text-primary border-b-2 border-primary bg-red-50'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                    }`}
                            >
                                <span className="text-xl">{tab.icon}</span>
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Ro'yxatdan o'tgan foydalanuvchilar ({users.length} ta)
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px]">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Ismi</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Ro'yxatdan o'tgan sana</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.email} className="border-b hover:bg-gray-50">
                                            <td className="py-3 px-4">{user.firstName} {user.lastName}</td>
                                            <td className="py-3 px-4">{user.email}</td>
                                            <td className="py-3 px-4">
                                                {new Date(user.registeredAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">
                                                <select
                                                    value={user.role}
                                                    onChange={(e) => onUpdateUserRole(user.email, e.target.value)}
                                                    className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="space-y-6">
                        {/* Add Product Form */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Yangi Mahsulot Qo'shish
                            </h3>
                            <form onSubmit={handleAddProduct} className="space-y-3">
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    placeholder="Tovar nomi"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <input
                                    type="number"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    placeholder="Narxi (so'm)"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <select
                                    value={newProduct.categoryId}
                                    onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="">Kategoriya tanlang</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Omborda nechta bor? *
                                    </label>
                                    <input
                                        type="number"
                                        value={newProduct.stock}
                                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                        placeholder="Miqdori (dona)"
                                        min="0"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tovar rasmi (ixtiyoriy)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    {newProduct.image && (
                                        <div className="mt-2">
                                            <img
                                                src={newProduct.image}
                                                alt="Preview"
                                                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                                            />
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium"
                                >
                                    Tovar qo'shish
                                </button>
                            </form>
                        </div>

                        {/* Products List */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Barcha Mahsulotlar ({products.length} ta)
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px]">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Rasm</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Nomi</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Narxi</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Kategoriya</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Omborda</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Amallar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => {
                                            const category = categories.find(c => c.id === product.categoryId);
                                            return (
                                                <tr key={product.id} className="border-b hover:bg-gray-50">
                                                    <td className="py-3 px-4">
                                                        {product.image ? (
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="w-16 h-16 object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4 font-medium">{product.name}</td>
                                                    <td className="py-3 px-4">{product.price.toLocaleString()} so'm</td>
                                                    <td className="py-3 px-4">
                                                        <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                                                            {category?.name || 'Noma\'lum'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => handleStockChange(product.id, Math.max(0, (product.stock || 0) - 1))}
                                                                className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition font-bold text-gray-700"
                                                            >
                                                                -
                                                            </button>

                                                            <input
                                                                type="number"
                                                                value={product.stock || 0}
                                                                onChange={(e) => handleStockChange(product.id, e.target.value)}
                                                                min="0"
                                                                className="w-16 px-2 py-1 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-center font-semibold"
                                                            />

                                                            <button
                                                                onClick={() => handleStockChange(product.id, (product.stock || 0) + 1)}
                                                                className="w-8 h-8 flex items-center justify-center bg-primary hover:bg-red-700 rounded transition font-bold text-white"
                                                            >
                                                                +
                                                            </button>

                                                            <span className={`text-xs font-semibold px-2 py-1 rounded ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                                {product.stock > 0 ? '✓ Bor' : '✗ Yo\'q'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <button
                                                            onClick={() => {
                                                                if (window.confirm(`"${product.name}" ni o'chirmoqchimisiz?`)) {
                                                                    onDeleteProduct(product.id);
                                                                }
                                                            }}
                                                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm font-medium"
                                                        >
                                                            O'chirish
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Categories Tab */}
                {activeTab === 'categories' && (
                    <div className="space-y-6">
                        {/* Add Category */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Yangi Kategoriya Qo'shish
                            </h3>
                            <form onSubmit={handleAddCategory} className="flex gap-3">
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    placeholder="Kategoriya nomi"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium"
                                >
                                    Qo'shish
                                </button>
                            </form>
                        </div>

                        {/* Categories List with Products */}
                        <div className="space-y-4">
                            {categories.map(category => {
                                const categoryProducts = products.filter(p => p.categoryId === category.id);
                                return (
                                    <div key={category.id} className="bg-white rounded-xl shadow-lg p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                {category.name} ({categoryProducts.length} ta mahsulot)
                                            </h3>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm(`"${category.name}" kategoriyasini o'chirmoqchimisiz?`)) {
                                                        onDeleteCategory(category.id);
                                                    }
                                                }}
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium"
                                            >
                                                Kategoriyani o'chirish
                                            </button>
                                        </div>

                                        {categoryProducts.length > 0 ? (
                                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {categoryProducts.map(product => (
                                                    <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition">
                                                        <div className="flex items-start gap-3">
                                                            {product.image ? (
                                                                <img
                                                                    src={product.image}
                                                                    alt={product.name}
                                                                    className="w-16 h-16 object-cover rounded-lg"
                                                                />
                                                            ) : (
                                                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-semibold text-gray-800 truncate">{product.name}</h4>
                                                                <p className="text-sm text-gray-600">{product.price.toLocaleString()} so'm</p>
                                                                <select
                                                                    value={product.categoryId}
                                                                    onChange={(e) => onUpdateProductCategory(product.id, parseInt(e.target.value))}
                                                                    className="mt-2 text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary w-full"
                                                                >
                                                                    {categories.map(cat => (
                                                                        <option key={cat.id} value={cat.id}>
                                                                            {cat.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 text-center py-8">Bu kategoriyada mahsulotlar yo'q</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Banners Tab */}
                {activeTab === 'banners' && (
                    <div className="space-y-6">
                        {/* Add Banner Form */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Yangi Banner Qo'shish
                            </h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target;
                                const title = form.title.value;
                                const description = form.description.value;
                                const buttonText = form.buttonText.value;
                                const linkType = form.linkType.value;
                                let link = '';

                                if (linkType === 'page') {
                                    link = form.pageLink.value;
                                } else if (linkType === 'category') {
                                    const categoryId = form.categoryLink.value;
                                    link = `/catalog?category=${categoryId}`;
                                } else if (linkType === 'product') {
                                    link = form.productLink.value;
                                }

                                const imageFile = form.image.files[0];

                                if (title && description && imageFile) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        onAddCarouselItem({
                                            title,
                                            description,
                                            buttonText,
                                            link,
                                            image: reader.result
                                        });
                                        form.reset();
                                    };
                                    reader.readAsDataURL(imageFile);
                                }
                            }} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        name="title"
                                        type="text"
                                        placeholder="Banner sarlavhasi"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <input
                                        name="description"
                                        type="text"
                                        placeholder="Banner tavsifi"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <input
                                    name="buttonText"
                                    type="text"
                                    placeholder="Tugma matni (masalan: Batafsil)"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />

                                {/* Link Type Selection */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Havola turi
                                    </label>
                                    <select
                                        name="linkType"
                                        onChange={(e) => {
                                            const linkType = e.target.value;
                                            const pageLink = document.querySelector('[name="pageLink"]');
                                            const categoryLink = document.querySelector('[name="categoryLink"]');
                                            const productLink = document.querySelector('[name="productLink"]');

                                            pageLink.style.display = linkType === 'page' ? 'block' : 'none';
                                            categoryLink.style.display = linkType === 'category' ? 'block' : 'none';
                                            productLink.style.display = linkType === 'product' ? 'block' : 'none';
                                        }}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="">Havola turini tanlang</option>
                                        <option value="page">Sahifa</option>
                                        <option value="category">Kategoriya</option>
                                        <option value="product">Mahsulot</option>
                                    </select>

                                    {/* Page Link */}
                                    <select
                                        name="pageLink"
                                        style={{ display: 'none' }}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="">Sahifani tanlang</option>
                                        <option value="/">Bosh sahifa</option>
                                        <option value="/catalog">Katalog</option>
                                        <option value="/about">Biz haqimizda</option>
                                        <option value="/contact">Aloqa</option>
                                    </select>

                                    {/* Category Link */}
                                    <select
                                        name="categoryLink"
                                        style={{ display: 'none' }}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="">Kategoriyani tanlang</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Product Link */}
                                    <select
                                        name="productLink"
                                        style={{ display: 'none' }}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="">Mahsulotni tanlang</option>
                                        {products.map(product => {
                                            const category = categories.find(c => c.id === product.categoryId);
                                            return (
                                                <option key={product.id} value={`/catalog?product=${product.id}`}>
                                                    {product.name} ({category?.name})
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Banner rasmi (tavsiya: 1920x600px)
                                    </label>
                                    <input
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-medium"
                                >
                                    Banner qo'shish
                                </button>
                            </form>
                        </div>

                        {/* Banners List */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Barcha Bannerlar ({carouselItems.length} ta)
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {carouselItems.map(item => (
                                    <div key={item.id} className="border rounded-lg overflow-hidden group relative">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                            {item.buttonText && (
                                                <div className="text-xs bg-gray-100 p-2 rounded">
                                                    <span className="font-semibold">Tugma:</span> {item.buttonText} <br />
                                                    <span className="font-semibold">Link:</span> {item.link}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Bu bannerni o\'chirmoqchimisiz?')) {
                                                    onDeleteCarouselItem(item.id);
                                                }
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Statistics Tab */}
                {activeTab === 'statistics' && (
                    <div className="space-y-6">
                        {/* Overview Cards */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100 text-sm font-medium">Jami Tashriflar</p>
                                        <h3 className="text-3xl font-bold mt-2">{visitStats.totalVisits}</h3>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-100 text-sm font-medium">Noyob Tashrif Buyuruvchilar</p>
                                        <h3 className="text-3xl font-bold mt-2">{visitStats.uniqueVisitors.length}</h3>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-100 text-sm font-medium">Sahifa Ko'rinishlari</p>
                                        <h3 className="text-3xl font-bold mt-2">{visitStats.pageViews.length}</h3>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-lg">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Page Views Chart */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Eng Ko'p Ko'rilgan Sahifalar
                            </h3>
                            {visitStats.pageViews.length > 0 ? (
                                <div className="space-y-3">
                                    {Object.entries(
                                        visitStats.pageViews.reduce((acc, view) => {
                                            acc[view.path] = (acc[view.path] || 0) + 1;
                                            return acc;
                                        }, {})
                                    )
                                        .sort((a, b) => b[1] - a[1])
                                        .slice(0, 10)
                                        .map(([path, count]) => {
                                            const maxCount = Math.max(...Object.values(
                                                visitStats.pageViews.reduce((acc, view) => {
                                                    acc[view.path] = (acc[view.path] || 0) + 1;
                                                    return acc;
                                                }, {})
                                            ));
                                            return (
                                                <div key={path} className="flex items-center gap-4">
                                                    <span className="w-40 text-sm text-gray-600 truncate">{path || '/'}</span>
                                                    <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
                                                        <div
                                                            className="bg-primary h-8 flex items-center justify-end px-3 text-white font-semibold text-sm transition-all"
                                                            style={{ width: `${(count / maxCount) * 100}%`, minWidth: '40px' }}
                                                        >
                                                            {count}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">Hali ma'lumotlar yo'q</p>
                            )}
                        </div>

                        {/* Recent Visitors */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                So'nggi Tashrif Buyuruvchilar
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Session ID</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Birinchi Tashrif</th>
                                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Sahifalar Soni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visitStats.uniqueVisitors.slice(-10).reverse().map((visitor) => {
                                            const visitorPageViews = visitStats.pageViews.filter(
                                                pv => pv.sessionId === visitor.sessionId
                                            ).length;
                                            return (
                                                <tr key={visitor.sessionId} className="border-b hover:bg-gray-50">
                                                    <td className="py-3 px-4 font-mono text-sm">{visitor.sessionId.substring(0, 16)}...</td>
                                                    <td className="py-3 px-4">{new Date(visitor.firstVisit).toLocaleString()}</td>
                                                    <td className="py-3 px-4">
                                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-semibold">
                                                            {visitorPageViews}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
