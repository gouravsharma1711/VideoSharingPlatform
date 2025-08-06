import { useNavigate } from 'react-router-dom';
import User from '../../../backendUtility/user.utility';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../../Features/User/User.slice';
import userObject from '../../../backendUtility/user.utility';
import { toast } from 'react-toastify';
import { useState } from 'react';

function LoggedInView({ user, setIsOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.user.userData.userName);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      const response = await userObject.deleteAccount();
      if (response.statusCode === 200) {
        toast.success("Account Deleted Successfully");
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
        window.location.reload();
        setIsOpen((prev)=>!prev)
      } else {
        toast.error("Error Occurred while deleting account");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const menuItems = [
    { icon: "fa-solid fa-user", label: "Your Profile", to: `/user/${userName}` },
    { icon: "fa-solid fa-chart-line", label: "Dashboard", to: "/user/dashboard" },
    { 
      icon: "fa-solid fa-trash", 
      label: "Delete Account", 
      action: () => setShowDeleteConfirm(true) 
    }
  ];

  const handleNavigate = (to) => {
    setIsOpen(false);
    navigate(to);
  };

  const logOutHandler = async () => {
    try {
      await User.logOutUser();
      dispatch(logOutUser());
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="absolute right-0 top-14 w-56 bg-slate-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl z-50 overflow-hidden">
      <div className="px-4 py-4 border-b border-gray-700/50 bg-gradient-to-r from-purple-600/10 to-blue-600/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
              <img src={user.avatar} alt="avatar" />
            </div>
          </div>
          <div>
            <p className="text-sm text-white font-bold">{user.fullName}</p>
            <p className="text-xs text-slate-400 truncate">{user.userName}</p>
          </div>
        </div>
      </div>

      <div className="py-2">
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => item.action ? item.action() : handleNavigate(item.to)}
            className="cursor-pointer flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 hover:text-white transition-all duration-200 group"
          >
            <i className={`${item.icon} text-purple-400 group-hover:scale-110 transition-transform duration-200 w-4`}></i>
            <span className="group-hover:translate-x-1 transition-transform duration-200">{item.label}</span>
          </div>
        ))}
      </div>

      {showDeleteConfirm && (
        <div className="border-t border-gray-700/50 p-4 bg-red-900/30">
          <p className="text-sm text-white mb-3">Are you sure you want to delete your account?</p>
          <div className="flex gap-3">
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
            >
              Yes
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="border-t border-gray-700/50"></div>

      <div className="py-2">
        <button
          className="flex items-center gap-4 px-4 py-3 w-full text-sm text-red-400 hover:bg-red-600/20 hover:text-red-300 transition-all duration-200 group"
          onClick={logOutHandler}
        >
          <i className="fa-solid fa-right-from-bracket group-hover:scale-110 transition-transform duration-200 w-4"></i>
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            Log Out
          </span>
        </button>
      </div>
    </div>
  );
}

export default LoggedInView;
