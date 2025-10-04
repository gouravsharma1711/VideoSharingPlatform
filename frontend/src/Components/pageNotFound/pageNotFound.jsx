import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/')
    }

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center px-4 py-8">
            <div className="max-w-2xl w-full text-center">
                {/* Large 404 Number */}
                <div className="mb-8">
                    <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight">
                        404
                    </h1>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-md mx-auto leading-relaxed">
                        The page you're looking for doesn't exist or has been moved. 
                        Don't worry, let's get you back on track!
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="mb-8 flex justify-center items-center space-x-4">
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-60"></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"></div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={handleGoHome}
                        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-30"
                        data-testid="go-home-button"
                    >
                        🏠 Go to Home
                    </button>
                    <button
                        onClick={handleGoBack}
                        className="w-full sm:w-auto px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-30"
                        data-testid="go-back-button"
                    >
                        ← Go Back
                    </button>
                </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500 opacity-10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-purple-400 opacity-5 rounded-full blur-lg animate-bounce delay-500"></div>
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-400 opacity-5 rounded-full blur-lg animate-bounce delay-700"></div>
            </div>
        </div>
    )
}

export default PageNotFound
