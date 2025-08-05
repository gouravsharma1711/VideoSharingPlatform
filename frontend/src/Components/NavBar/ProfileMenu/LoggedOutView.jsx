import React from "react";
import { NavLink } from "react-router-dom";

function LoggedOutView({ setIsOpen }) {
  return (
    <div className="absolute right-0 top-14 w-56 bg-slate-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl z-50 overflow-hidden">
      <NavLink
        to="/user/signin"
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 hover:text-white transition-all duration-200 group ${
            isActive
              ? `bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white`
              : ""
          }`
        }
      >
        <i className="fa-solid fa-right-to-bracket"></i>
        <span className="group-hover:translate-x-1 transition-transform duration-200">
          Log In User
        </span>
      </NavLink>

      <NavLink
        to="/user/signup"
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 hover:text-white transition-all duration-200 group ${
            isActive
              ? `bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white`
              : ""
          }`
        }
      >
        <i className="fa-solid fa-user-plus"></i>
        <span className="group-hover:translate-x-1 transition-transform duration-200">
          Sign Up User
        </span>
      </NavLink>
    </div>
  );
}

export default LoggedOutView;
