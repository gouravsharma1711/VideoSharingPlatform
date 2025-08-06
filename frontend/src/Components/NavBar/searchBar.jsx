import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/results?search_query=${encodeURIComponent((query.toLowerCase()).trim())}`);
        }
    };

    return (
        <div className="relative group">
            <div
                className={`absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur transition-opacity duration-300 ${
                    isFocused ? 'opacity-100' : 'opacity-0'
                }`}
            ></div>
            <div className="relative flex items-center">
                <button
                    type="button"
                    onClick={handleSearch}
                    className="absolute inset-y-0 left-0 flex items-center pl-4 z-10"
                >
                    <svg
                        className={`w-5 h-5 transition-colors duration-300 ${
                            isFocused ? 'text-purple-400' : 'text-slate-400'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <input
                    type="text"
                    placeholder="Search videos, channels..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full bg-slate-800/80 backdrop-blur-sm text-white placeholder-slate-400 border border-slate-700/50 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-slate-700/80"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
        </div>
    );
}

export default SearchBar;
