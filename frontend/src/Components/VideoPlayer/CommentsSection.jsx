import { useState, useRef, useEffect } from "react";
import CommentCard from "./CommentCard.jsx";
import { useParams } from "react-router-dom";
import commentsObject from "../../backendUtility/comments.utility.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CommentsSection = () => {
  const videoId = useParams().videoId;
  const user = useSelector((state) => state.user.userData);

  const [isFullView, setIsFullView] = useState(false);
  const [comments, setComments] = useState([]);
  const commentReference = useRef(null);

  // Show only 2 comments unless user clicks "See More"
  const visibleComments = isFullView ? comments : comments.slice(0, 2);

  const toggleView = () => setIsFullView((prev) => !prev);

  const FetchComment = async () => {
    try {
      const response = await commentsObject.getVideoComments(videoId);
      if (response.statusCode === 200) {
        setComments(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    FetchComment();
  }, [videoId]);

  const handlePostComment = async (e) => {
    try {
      e.preventDefault();
      const text = commentReference.current.value.trim();
      if (!text) return;

      const response = await commentsObject.addComment({ content: text, videoId });

      if (response.statusCode === 201) {
        toast.success("Comment Posted Successfully");
        FetchComment();
      } else {
        toast.error(response.message);
      }
      commentReference.current.value = "";
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-white">
          <i className="fa-solid fa-comments mr-2 text-purple-400"></i>
          {comments.length} Comments
        </h2>
      </div>

      {/* Add Comment */}
      <div className="bg-slate-700/30 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img
              src={user?.avatar}
              alt="Your avatar"
              className="relative w-10 h-10 rounded-full border-2 border-purple-500/30"
            />
          </div>
          <div className="flex-1 space-y-3">
            <input
              type="text"
              placeholder="Add a comment..."
              ref={commentReference}
              className="w-full bg-slate-600/50 border border-gray-600/50 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
            />
            <button
              onClick={handlePostComment}
              className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                <i className="fa-solid fa-paper-plane"></i>
                Post Comment
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {visibleComments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} FetchComment={FetchComment} />
        ))}
      </div>

      {/* Toggle Button */}
      {comments.length > 2 && (
        <div className="text-center">
          <button
            onClick={toggleView}
            className="group flex items-center gap-2 mx-auto text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-105"
          >
            <span className="font-medium">
              {isFullView
                ? "Show Less Comments"
                : `Show ${comments.length - 2} More Comments`}
            </span>
            <i
              className={`fa-solid ${
                isFullView ? "fa-chevron-up" : "fa-chevron-down"
              } group-hover:scale-110 transition-transform duration-200`}
            ></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
