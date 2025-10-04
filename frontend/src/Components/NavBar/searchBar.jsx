import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import user from '../../backendUtility/user.utility.js'
function SearchBar({ setMobileSearchOpen }) {
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllUser = async () => {
            try {
                const response = await user.getAllUsers();
                setUsers(response.data.map((user) => user.userName));
            } catch (error) {
                console.log(error);
            }
        };
        getAllUser();
    }, []);

    const filteredUsers = users.filter(user => user.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5);

    const handleSearch = () => {

        if (query.trim()) {
            setQuery("");
            navigate(`/results?search_query=${encodeURIComponent((query.toLowerCase()).trim())}`);
            if (setMobileSearchOpen) setMobileSearchOpen(false);
        }
    };

    const handleUserSelect = (user) => {
        setQuery(user);
        navigate(`/results?search_query=${encodeURIComponent(user.toLowerCase().trim())}`);
        setIsFocused(false);
        if (setMobileSearchOpen) setMobileSearchOpen(false);
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
                    onBlur={() => {
                        setTimeout(() => setIsFocused(false), 150);
                    }}
                />
            </div>
            {filteredUsers.length > 0 && query && isFocused && (
                <ul className="absolute top-full left-0 right-0 bg-slate-700 backdrop-blur-sm border border-slate-700/50 rounded-lg mt-1 max-h-60 overflow-y-auto z-20 shadow-lg">
                    {filteredUsers.map((user, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 text-white hover:bg-slate-700 cursor-pointer transition-colors duration-200 text-sm md:text-base"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleUserSelect(user);
                            }}
                        >
                            {user}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
