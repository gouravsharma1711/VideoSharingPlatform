import { Link, useNavigate } from "react-router-dom";
import user from "../../backendUtility/user.utility.js";
import LoadingSpinner from "../Loading/LoadingSpinner.jsx";
import Field from "../CoreComponents/Field.jsx";
import { useForm } from "react-hook-form";
import useApi from "../../Hooks/useApi.js";

const inputClass =
  "w-full bg-slate-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300";
const labelClass = "block text-sm font-medium text-gray-300 mb-2";
const fileInputClass =
  "w-full text-sm text-gray-300 border border-gray-600/50 rounded-xl cursor-pointer bg-slate-700/50 file:mr-4 file:py-2 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition-all duration-300";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { data, loading, request } = useApi(user.registerUser);

  const avatarFile = watch("avatar")?.[0];
  const coverImageFile = watch("coverImage")?.[0];

  const navigate = useNavigate();

  const signUpSubmitHandler = async (currFormData) => {
    const formData = new FormData();
    formData.append("userName", currFormData.userName);
    formData.append("email", currFormData.email);
    formData.append("fullName", currFormData.fullName);
    formData.append("password", currFormData.password);

    if (currFormData.avatar && currFormData.avatar[0]) {
      formData.append("avatar", currFormData.avatar[0]);
    }

    if (currFormData.coverImage && currFormData.coverImage[0]) {
      formData.append("coverImage", currFormData.coverImage[0]);
    }

    const response = await request(formData);

    if (response && response.statusCode === 200) {
      navigate("/user/signin", {
        state: {
          toastMessage: `${response.data.userName} Signed Up successfully!`,
        },
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center px-4 py-20 ">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75"></div>
            <h1 className="relative text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent px-4 py-2">
              VideoStream
            </h1>
          </div>
          <p className="text-gray-400 mt-2">
            Join our community and start sharing your videos
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Create Account
          </h2>

          <form
            className="space-y-6"
            onSubmit={handleSubmit(signUpSubmitHandler)}
          >
            {/* Username */}
            <div className="space-y-2">
              <Field
                forLabel="userName"
                lableCustomClass={labelClass}
                lableChildren="User Name"
                type="text"
                name="userName"
                InputId="userName"
                InputCustomClass={inputClass}
                placeholder="Enter userName"
                canChange={!loading}
                {...register("userName", {
                  required: "UserName is Required",
                  maxLength: {
                    value: 30,
                    message: "Max Length is 30 characters",
                  },
                  validate: (value) =>
                    /^[a-z0-9._@-]+$/.test(value) ||
                    "User Name should be in lowercase",
                })}
              />
              {errors.userName && (
                <p className="text-red-400 text-sm">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Field
                forLabel="fullName"
                lableCustomClass={labelClass}
                lableChildren="Full Name"
                type="text"
                name="fullName"
                InputId="fullName"
                InputCustomClass={inputClass}
                placeholder="Enter Full Name"
                canChange={!loading}
                {...register("fullName", {
                  required: "Full Name is Required",
                  maxLength: {
                    value: 50,
                    message: "Max Length should be 50",
                  },
                })}
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Field
                forLabel="email"
                lableCustomClass={labelClass}
                lableChildren="Email Address"
                type="email"
                name="email"
                InputId="email"
                InputCustomClass={inputClass}
                placeholder="Enter Email address"
                canChange={!loading}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Field
                forLabel="password"
                lableCustomClass={labelClass}
                lableChildren="Password"
                type="password"
                name="password"
                InputId="password"
                InputCustomClass={inputClass}
                placeholder="Enter password here"
                canChange={!loading}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-400 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Field
                  forLabel="avatar"
                  lableCustomClass={labelClass}
                  lableChildren={
                    <>
                      <i className="fa-solid fa-user mr-2 text-purple-400"></i>
                      Avatar Image
                    </>
                  }
                  type="file"
                  name="avatar"
                  InputId="avatar"
                  InputCustomClass={fileInputClass}
                  canChange={!loading}
                  {...register("avatar", {
                    required: "Avatar is required",
                    validate: (fileList) => {
                      if (!fileList || fileList.length === 0) {
                        return "Avatar is required";
                      }
                      const file = fileList[0];
                      if (!file.type.startsWith("image/")) {
                        return "Only image files are allowed (PNG, JPG, GIF, etc.)";
                      }
                      return true;
                    },
                  })}
                />
                <p className="text-xs text-gray-400">
                  {avatarFile
                    ? `${Number(
                        (avatarFile.size / (1024 * 1024)).toFixed(2)
                      )} Mb`
                    : "PNG, JPG, or GIF"}
                </p>
                {errors.avatar && (
                  <p className="text-red-400 text-sm">
                    {errors.avatar.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Field
                  forLabel="coverImage"
                  lableCustomClass={labelClass}
                  lableChildren={
                    <>
                      <i className="fa-solid fa-image mr-2 text-purple-400"></i>
                      Cover Image
                    </>
                  }
                  type="file"
                  name="coverImage"
                  InputId="coverImage"
                  InputCustomClass={fileInputClass}
                  canChange={!loading}
                  {...register("coverImage", {
                    validate: (fileList) => {
                      if (!fileList || fileList.length === 0) {
                        return true;
                      }
                      const file = fileList[0];
                      if (!file.type.startsWith("image/")) {
                        return "Only image files are allowed (PNG, JPG, GIF, etc.)";
                      }
                      return true;
                    },
                  })}
                />
                <p className="text-xs text-gray-400">
                  {coverImageFile
                    ? `${Number(
                        (coverImageFile.size / (1024 * 1024)).toFixed(2)
                      )} Mb`
                    : "PNG, JPG, or GIF"}{" "}
                </p>
                {errors.coverImage && (
                  <p className="text-red-400 text-sm">
                    {errors.coverImage.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <span className="relative z-10">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <LoadingSpinner size={20} />
                  </div>
                ) : (
                  "Create Account"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/user/signin"
                className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors duration-300"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
