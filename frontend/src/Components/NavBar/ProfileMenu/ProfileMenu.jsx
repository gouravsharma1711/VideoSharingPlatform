import { useState, useEffect } from 'react';
import LoggedInView from './LoggedInView';
import LoggedOutView from './LoggedOutView';
import { useSelector } from 'react-redux';
import { loggedInUser,logOutUser } from '../../../Features/User/User.slice';

function ProfileMenu({ isOpen, setIsOpen }) {
    const user = useSelector((state) => state.user.userData);
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    
    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative group"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-0.5 hover:scale-110 transition-transform duration-200">
                    <div className=" w-full h-full rounded-full overflow-hidden bg-slate-800">
                        <img
                            src={user!==null?user.avatar:'https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png'}
                            alt="profile"
                            className="h-full w-full"
                        />
                    </div>
                </div>
            </button>

            {isOpen && (user !== null ? <LoggedInView user={user} setIsOpen={setIsOpen}/> : <LoggedOutView setIsOpen={setIsOpen} />)}
        </div>
    );
}

export default ProfileMenu;
