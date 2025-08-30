import { Link } from "react-router-dom";

function ChannelNotFound({ message = "The channel you are looking for does not exist." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
        {/* Simple Icon Container */}
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <i className="fa-solid fa-satellite-dish text-4xl text-red-500"></i>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Channel Not Found</h1>
        <p className="text-gray-400 mb-6">{message}</p>
        
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-300"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChannelNotFound;