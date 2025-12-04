import React, { useState } from 'react';

const Login = ({ onLogin, onNavigate }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('Iltimos, barcha maydonlarni to\'ldiring');
            return;
        }

        if (isRegister && (!formData.firstName || !formData.lastName)) {
            setError('Iltimos, barcha maydonlarni to\'ldiring');
            return;
        }

        const success = onLogin(formData, isRegister);
        if (!success) {
            setError(isRegister ? 'Bu email allaqachon ro\'yxatdan o\'tgan' : 'Email yoki parol noto\'g\'ri');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            {isRegister ? 'Ro\'yxatdan o\'tish' : 'Kirish'}
                        </h2>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {isRegister && (
                                <>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Ism
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Ismingiz"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Familiya
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Familiyangiz"
                                        />
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Parol
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold text-lg"
                            >
                                {isRegister ? 'Ro\'yxatdan o\'tish' : 'Kirish'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => {
                                    setIsRegister(!isRegister);
                                    setError('');
                                    setFormData({ firstName: '', lastName: '', email: '', password: '' });
                                }}
                                className="text-primary hover:underline"
                            >
                                {isRegister
                                    ? 'Akkauntingiz bormi? Kirish'
                                    : 'Akkauntingiz yo\'qmi? Ro\'yxatdan o\'tish'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
