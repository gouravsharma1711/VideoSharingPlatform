import { Link } from 'react-router-dom'

export default function Auth({ message = "Sign in to continue", subMessage = "Access your personalized content", buttonText = "Sign In" }) {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-white text-center px-4">
      <div className="mb-6 h-[15rem] w-[15rem]">
        <img  className="w-full h-full" src="https://res.cloudinary.com/dcs7eq5kf/image/upload/v1753995785/person_bkejva.png" alt="No User Found" />
      </div>

      <h2 className="text-xl font-semibold">{message}</h2>
      <p className="text-sm text-gray-400 mt-1">{subMessage}</p>

      <Link to="/signin" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white p-2 w-[10rem] rounded-xl transition duration-300 my-5">
        {buttonText}
      </Link>
    </div>
  );
}
