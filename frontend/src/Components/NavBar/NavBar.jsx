
import { useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";

function NavBar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="relative">
            <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            
            <div className={`relative transition-all duration-300 ease-in-out ${isSidebarOpen ? 'sm:ml-64' : ''}`}>
                <Header
                    toggleSidebar={toggleSidebar}
                    isProfileMenuOpen={isProfileMenuOpen}
                    setProfileMenuOpen={setProfileMenuOpen}
                    isMobileSearchOpen={isMobileSearchOpen}
                    setMobileSearchOpen={setMobileSearchOpen}
                />
            </div>
        </div>
    );
}

export default NavBar
