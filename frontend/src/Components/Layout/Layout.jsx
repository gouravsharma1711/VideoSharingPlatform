import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from '../NavBar/NavBar.jsx'
import {useLocation} from 'react-router-dom'
function Layout() {
    const location = useLocation();
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
            <NavBar />
            <main className="transition-all duration-300 ease-in-out">
                <Outlet key={location.pathname}/>
            </main>
        </div>
    )
}

export default Layout
