import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Xatolik yuz berdi! ⚠️</h1>
                        <p className="text-gray-700 mb-4">
                            Saytni yuklashda muammo bo'ldi. Iltimos, quyidagi xatolikni dasturchiga yuboring:
                        </p>
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm font-mono mb-6 max-h-64">
                            <p className="font-bold text-red-400">{this.state.error && this.state.error.toString()}</p>
                            <pre className="mt-2 text-xs text-gray-400">
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Sahifani yangilash
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
