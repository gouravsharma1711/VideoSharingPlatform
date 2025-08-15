import { useState } from "react";
import FormLabel from "../CoreComponents/FormLabel";
import FormInput from "../CoreComponents/FormInput";
import ChangePassword from "./changePassword";
import userObject from "../../backendUtility/user.utility";
import { toast } from "react-toastify";
import LoadingSpinner from "../Loading/LoadingSpinner";

const UserProfile = ({ onClose, user }) => {
  const [coverImage, setCoverImage] = useState(user.coverImage);
  const [avatar, setAvatar] = useState(user.avatar);
  const [isUpdatingProfile,setIsUpadtingProfile]=useState(false);

  const [isCoverImageLoading, setIsCoverImageLoading] = useState(false);
  const [isAvatarImageLoading, setIsAvatarImageLoading] = useState(false);

  const [formData, setFormData] = useState({
    userName: user.userName,
    fullName: user.fullName,
    email: user.email,
  });

  const onChangeCoverImage = async (e) => {
    try {
      setIsCoverImageLoading(true);
      const form = new FormData();
      form.append("coverImage", e.target?.files[0]);
      const response = await userObject.updateCoverImage(form);
      console.log("Cover image : ", response);
      if (response.statusCode === 200) {
        toast.success(response.message);
        setCoverImage(response.data.coverImage);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsCoverImageLoading(false);
    }
  };

  const onChangeAvatarImage = async (e) => {
    try {
      setIsAvatarImageLoading(true);
      const form = new FormData();
      form.append("avatar", e.target?.files[0]);
      const response = await userObject.updateAvatar(form);
      if (response.statusCode === 200) {
        toast.success(response.message);
        setAvatar(response.data.avatar);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAvatarImageLoading(false);
    }
  };

  const [isChangeingPassword, setIsChangingPassword] = useState(false);
  const handleToggleClick = () => {
    setIsChangingPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const UpdateDetailsHandler = async(e) => {
    try {
      setIsUpadtingProfile(true);
      e.preventDefault();
      const response=await userObject.updateAccountDetails(formData);
      console.log("Response : ",response);
      
      if(response.statusCode===200){
        toast.success("Profile Details Update SuccessFully")
      }else{
        toast.error("Something went wrong")
      }
    } catch (error) {
      console.log(Error);
      toast.error("Something went wrong")
    }finally{
      setIsUpadtingProfile(false);
    }
  };
  return (
    <div
      id="editProfile"
      className="mx-5 relative w-full max-w-4xl p-6 sm:p-8 text-white bg-slate-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl overflow-auto max-h-[90vh]"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 text-white bg-red-600/80 hover:bg-red-600 w-10 h-10 rounded-full text-lg font-bold transition-all duration-300 hover:scale-110 flex items-center justify-center"
        title="Close"
      >
        ×
      </button>

      <div className="relative mb-8">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={`${coverImage}`}
            alt="Cover"
            className="w-full h-48 sm:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <label
            htmlFor="coverUpload"
            className="absolute top-4 right-4 cursor-pointer bg-purple-600/80 hover:bg-purple-600 backdrop-blur-sm px-4 py-2 text-sm rounded-xl transition-all duration-300 hover:scale-105 border border-purple-500/30"
          >
            {isCoverImageLoading ? <LoadingSpinner size={20} /> : "Edit Cover"}
          </label>
          <input
            id="coverUpload"
            type="file"
            accept="image/*"
            className="hidden"
            name="coverImage"
            onChange={onChangeCoverImage}
          />
        </div>

        <div className="absolute -bottom-12 left-6 flex items-center gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img
              src={`${avatar}`}
              alt="Profile"
              className="relative w-24 h-24 rounded-full border-4 border-slate-800 object-cover"
            />
          </div>
          <label
            htmlFor="avatarUpload"
            className="cursor-pointer bg-purple-600/80 hover:bg-purple-600 backdrop-blur-sm px-4 py-2 text-sm rounded-xl transition-all duration-300 hover:scale-105 border border-purple-500/30"
          >
            {isAvatarImageLoading ? (
              <LoadingSpinner size={20} />
            ) : (
              "Edit Avatar"
            )}
          </label>
          <input
            id="avatarUpload"
            name="avatar"
            onChange={onChangeAvatarImage}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      <div className="mt-16 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Edit Profile
          </h1>
          <p className="text-gray-400">Update your profile information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <FormLabel
              forLabel="userName"
              customClass="block text-sm font-medium text-gray-300"
            >
              <i className="fa-solid fa-at mr-2 text-purple-400"></i>
              Username
            </FormLabel>
            <FormInput
              placeholder="Enter your username..."
              type="text"
              name="userName"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              customClass="w-full bg-slate-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <FormLabel
              forLabel="fullName"
              customClass="block text-sm font-medium text-gray-300"
            >
              <i className="fa-solid fa-user mr-2 text-purple-400"></i>
              Full Name
            </FormLabel>
            <FormInput
              placeholder="Enter your full name..."
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              customClass="w-full bg-slate-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <FormLabel
            forLabel="email"
            customClass="block text-sm font-medium text-gray-300"
          >
            <i className="fa-solid fa-envelope mr-2 text-purple-400"></i>
            Email Address
          </FormLabel>
          <FormInput
            placeholder="Enter your email..."
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            customClass="w-full bg-slate-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={UpdateDetailsHandler}
          className="flex-1 min-w-[200px] relative group overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
            <span className="relative z-10">
              <i className="fa-solid fa-save mr-2"></i>
              {isUpdatingProfile? <LoadingSpinner size={20}/>:"Save Changes"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            className="flex-1 min-w-[200px] relative group overflow-hidden bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
            onClick={handleToggleClick}
          >
            <span className="relative z-10">
              <i
                className={`fa-solid ${
                  isChangeingPassword ? "fa-times" : "fa-key"
                } mr-2`}
              ></i>
              {isChangeingPassword ? "Close" : "Change Password"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {isChangeingPassword && (
        <div className="mt-8 p-6 bg-slate-700/30 backdrop-blur-sm rounded-2xl border border-gray-600/50">
          <ChangePassword />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
