import { useState, useRef, useEffect } from "react";
import CommentCard from "../CoreComponents/Cards/CommentCard.jsx";
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
    if(!user){
      toast.info('Please login first');
      return;
    }
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
        <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-slate-100">
          <i className="fa-solid fa-comments mr-2 text-blue-400"></i>
          {comments.length} Comments
        </h2>
      </div>

      {/* Add Comment */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-4">
        <div className="flex items-start gap-4">
          <img
            src={user?.avatar || "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"}
            alt="Your avatar"
            className="w-10 h-10 rounded-full border-2 border-slate-600"
          />
          <div className="flex-1 space-y-3">
            <input
              type="text"
              placeholder="Add a comment..."
              ref={commentReference}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <button
              onClick={handlePostComment}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-paper-plane"></i>
                Post Comment
              </span>
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
            className="flex items-center gap-2 mx-auto text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105"
          >
            <span className="font-medium">
              {isFullView
                ? "Show Less Comments"
                : `Show ${comments.length - 2} More Comments`}
            </span>
            <i
              className={`fa-solid ${
                isFullView ? "fa-chevron-up" : "fa-chevron-down"
              } transition-transform duration-200`}
            ></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
