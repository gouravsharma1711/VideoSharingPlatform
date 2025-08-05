import React from 'react';
import ProfileMenu from './ProfileMenu/ProfileMenu.jsx';
import SearchBar from './searchBar.jsx';

function Header({ toggleSidebar, isProfileMenuOpen, setProfileMenuOpen, isMobileSearchOpen, setMobileSearchOpen }) {
    return (
        <header className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 backdrop-blur-md border-b border-gray-700/50 shadow-2xl sticky top-0 z-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            aria-label="Open sidebar"
                            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 group"
                        >
                            <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75"></div>
                                <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="Logo" className="relative h-8 w-8 rounded-lg" />
                            </div>
                            <span className="hidden sm:block text-white text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                VideoStream
                            </span>
                        </div>
                    </div>

                    <div className="hidden md:block flex-1 max-w-2xl mx-8">
                        <SearchBar />
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileSearchOpen(!isMobileSearchOpen)}
                            aria-label="Toggle search"
                            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 group"
                        >
                            <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        
                        <ProfileMenu isOpen={isProfileMenuOpen} setIsOpen={setProfileMenuOpen} />
                    </div>
                </div>
                {isMobileSearchOpen && (
                    <div className="md:hidden pt-2 pb-4 border-t border-gray-700/50">
                        <SearchBar />
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
