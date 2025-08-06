import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AuthWrapper({ children, fallbackMessage = "Please sign in to access this content" }) {
    const user = useSelector((state) => state.user.userData);

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-gradient-to-br from-slate-900/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
                        <div className="text-center">
                            <div className="mb-6">
                                <i className="fa-solid fa-lock text-6xl text-purple-400 mb-4"></i>
                                <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
                                <p className="text-gray-400">{fallbackMessage}</p>
                            </div>
                            
                            <div className="space-y-4">
                                <Link 
                                    to="/user/signin"
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
                                >
                                    <i className="fa-solid fa-sign-in-alt"></i>
                                    Sign In
                                </Link>
                                
                                <div className="text-gray-400 text-sm">
                                    Don't have an account?
                                </div>
                                
                                <Link 
                                    to="/user/signup"
                                    className="w-full bg-gradient-to-r from-slate-700 to-gray-700 hover:from-slate-600 hover:to-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-600/50 flex items-center justify-center gap-2"
                                >
                                    <i className="fa-solid fa-user-plus"></i>
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return children;
}

export default AuthWrapper;