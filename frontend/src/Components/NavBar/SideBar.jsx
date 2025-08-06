import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { ImageLoader } from '../Loading/MediaLoader.jsx';

function SideBar({ isOpen, toggleSidebar }) {
    const publicMenuItems = [
        { icon: "fa-solid fa-house", label: "Home", to: "/" },
    ];

    const privateMenuItems = [
        { icon: "fa-solid fa-chart-line", label: "Dashboard", to: "/user/dashboard", requiresAuth: true },
        { icon: "fa-solid fa-clock-rotate-left", label: "History", to: "/user/watch-history", requiresAuth: true },
        { icon: "fa-solid fa-thumbs-up", label: "Liked Videos", to: "/user/likes", requiresAuth: true },
        { icon: "fa-solid fa-video", label: "My Content", to: "/user/Content", requiresAuth: true },
        { icon: "fa-solid fa-users", label: "Subscriptions", to: "/user/subscriptions", requiresAuth: true }
    ];

    const user = useSelector((state) => state.user.userData);
    const menuItems = user ? [...publicMenuItems, ...privateMenuItems] : publicMenuItems;
    

    return (
        <>
            <div
                onClick={toggleSidebar}
                className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-30 transition-all duration-300 sm:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            ></div>
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900 backdrop-blur-md border-r border-gray-700/50 text-white z-40 transform transition-all duration-300 ease-in-out shadow-2xl ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="h-full px-4 flex flex-col mt-6 pb-4 overflow-y-auto">
                    
                    <div className="pb-6 flex flex-col items-center justify-center gap-3 border-b border-gray-700/50">
                        {user ? (
                            <Link to={`/user/${user.userName}`} className="group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-1">
                                        <ImageLoader 
                                            className="h-full w-full rounded-full object-cover" 
                                            src={user.avatar} 
                                            alt="Profile"
                                            fallbackSrc="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
                                        />
                                    </div>
                                </div>
                                <span className="text-lg font-bold mt-2 block text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    {user.fullName}
                                </span>
                            </Link>
                        ) : (
                            <div className="text-center">
                                <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gradient-to-r from-gray-600 to-gray-700 p-1 mx-auto mb-3">
                                    <ImageLoader 
                                        className="h-full w-full rounded-full object-cover" 
                                        src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
                                        alt="Guest Profile"
                                    />
                                </div>
                                <span className="text-lg font-bold text-gray-400">Guest User</span>
                                <div className="mt-3 space-y-2">
                                    <Link 
                                        to="/user/signin"
                                        className="block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
                                    >
                                        Sign In
                                    </Link>
                                    <Link 
                                        to="/user/signup"
                                        className="block bg-slate-700/50 hover:bg-slate-600/50 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 border border-gray-600/50"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <ul className="space-y-2 font-medium pt-6">
                        {menuItems.map((item) => (
                            <li key={item.label}>
                                <NavLink to={item.to} className={({isActive})=>`flex items-center gap-4 px-4 py-3 text-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 hover:text-white transition-all duration-300 group ${isActive ?'bg-gradient-to-r from-purple-600/20 to-blue-600/20':""}`}>
                                    <i className={`${item.icon} text-purple-400 group-hover:scale-110 transition-transform duration-200 w-5`}></i>
                                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-2 pt-2 border-t border-gray-700/50">
                        <div className="text-xs text-gray-500 text-center">
                            <p>© 2024 VideoStream</p>
                            <p className="mt-1">Made with ❤️</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default SideBar;
