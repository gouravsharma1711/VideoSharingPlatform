import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getTimeAgo from "../../../utils/getTimeAgo";
import { toast } from "react-toastify";
import commentsObject from "../../../backendUtility/comments.utility";
import Likes from "../../../backendUtility/likes.utility";
import like from "../../../backendUtility/likes.utility";

function CommentCard({ comment, FetchComment }) {
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const user = useSelector((state) => state.user.userData);

  const isCommentLikedByUser = async () => {
    try {
      const response = await like.isLikedCommentsByUser({
        userId: user?._id,
        commentId: comment?._id,
      });
      setIsCommentLiked(response?.statusCode === 200 && response?.data?.liked);
    } catch (error) {
      setIsCommentLiked(false);
      console.log("Error in IsCommentLiked:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await commentsObject.deleteComment(comment?._id);
      if (response.statusCode === 200) {
        toast.success("Comment deleted successfully");
        FetchComment();
      } else toast.error(response.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await commentsObject.updateComment({
        commentId: comment?._id,
        content: editedContent,
      });
      if (response.statusCode === 200) {
        toast.success("Comment updated successfully");
        setIsEditing(false);
        FetchComment();
      } else toast.error(response.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLike = async () => {
    try {
      setIsCommentLiked((prev) => {
        if (!prev) setIsDisliked(false);
        return !prev;
      });

      const response = await Likes.toggleCommentLike(comment?._id);

      if (response.statusCode === 200) {
        toast.success(response?.message);
        await FetchComment();
        await isCommentLikedByUser();
      } else toast.error(response.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDislike = async () => {
    setIsDisliked((prev) =>  !prev);
    if(!isDisliked)toast.success("You disliked The comment");
  };

  useEffect(() => {
    if (user?._id && comment?._id) {
      isCommentLikedByUser();
    }
  }, [user?._id, comment?._id, comment.likesCount]);

  return (
    <div className="bg-slate-700/20 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-4 hover:border-purple-500/20 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
          <img
            src={comment?.owner?.avatar}
            alt={comment?.owner?.userName}
            className="relative w-10 h-10 rounded-full border-2 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-pointer hover:scale-110"
          />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white hover:text-purple-300 transition-colors duration-300 cursor-pointer">
              {comment?.owner?.userName}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <i className="fa-solid fa-clock text-purple-400"></i>
              {getTimeAgo(comment.createdAt)}
            </span>
          </div>

          {!isEditing ? (
            <p className="text-gray-300 leading-relaxed">{comment.content}</p>
          ) : (
            <textarea
              className="w-full bg-slate-800/80 text-white border border-purple-500/30 rounded-lg px-3 py-2 focus:outline-none"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          )}

          <div className="flex flex-col gap-3 pt-2 flex-wrap">
            <div className="flex flex-row gap-2">
              {/* LIKE BUTTON */}
              <button
                onClick={handleLike}
                className={`group flex items-center gap-2 text-sm transition-all duration-300 hover:scale-105 ${
                  isCommentLiked
                    ? "text-green-400"
                    : "text-gray-400 hover:text-green-400"
                }`}
              >
                <i className="fa-solid fa-thumbs-up group-hover:scale-110 transition-transform duration-200"></i>
                <span className="font-medium">{comment.likesCount}</span>
              </button>

              {/* DISLIKE BUTTON */}
              <button
                onClick={handleDislike}
                className={`group text-sm transition-all duration-300 hover:scale-105 ${
                  isDisliked
                    ? "text-red-400"
                    : "text-gray-400 hover:text-red-400"
                }`}
              >
                <i
                  className={`fa-solid fa-thumbs-down group-hover:scale-110 transition-transform duration-200 ${
                    isDisliked ? "text-red-400" : ""
                  }`}
                ></i>
              </button>
            </div>

            {user._id === comment?.owner?._id && (
              <div className="flex flex-row gap-2">
                {!isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-3 py-1 rounded-lg text-white bg-yellow-600 hover:bg-yellow-700"
                    >
                      <i className="fa-solid fa-pen-to-square mr-1"></i> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="px-3 py-1 rounded-lg text-white bg-red-600 hover:bg-red-700"
                    >
                      <i className="fa-solid fa-trash-can mr-1"></i> Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleEditSubmit}
                      className="px-3 py-1 rounded-lg text-white bg-green-600 hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedContent(comment.content);
                      }}
                      className="px-3 py-1 rounded-lg text-white bg-gray-600 hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
