import {
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/20/solid";
import { Post, RootState } from "../types/type";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import ActionMenu from "../components/ActionMenu";
import { deletePostById, getPostById } from "../service/post";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { likePost, unlikePost, checkLikeStatus } from "../service/like";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comment from "./Comment";

function Detail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.value);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initialSetUp() {
      if (!id) {
        console.log("No ID provided");
        return;
      }
      setIsLoading(true);
      try {
        const LikeStatus = await checkLikeStatus(id, currentUser.id);
        const data = await getPostById(id);
        setIsLiked(LikeStatus);
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [currentUser.id, id]);

  const deletePost = async (id: string) => {
    try {
      await deletePostById(id);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const editPost = async (id: string) => {
    navigate(`/dashboard/edit/${id}`);
  };
  const actionsOptions = [
    { name: "Edit", click: editPost },
    { name: "Delete", click: deletePost },
  ];

  const handleLikeToggle = async () => {
    if (!id) {
      console.log("No ID provided");
      return;
    }
    try {
      if (isLiked) {
        await unlikePost(id, currentUser.id);
        toast.success("unlike post successfully!");
      } else {
        await likePost(id, currentUser.id);
        toast.success("like post successfully!");
      }
      // Toggle the like status
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while toggling the like status.");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (post && id)
    return (
      <>
        <ToastContainer position="bottom-right" />
        <div className="bg-white border rounded-lg p-4 max-w-lg mx-auto mt-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to={`/dashboard/user-profile/${post.userId}`}>
                <img
                  src={post.userProfilePicture}
                  alt={`${post.username}'s profile`}
                  className="w-10 h-10 rounded-full mr-4"
                />
              </Link>
              <div className="text-sm">
                <p className="font-bold">{post.username}</p>
                <p className="text-gray-500">
                  {format(new Date(post.createdAt), "MMMM d, yyyy")}
                </p>
              </div>
            </div>

            {currentUser.id === post.userId && (
              <ActionMenu actionsOptions={actionsOptions} postId={post.id} />
            )}
          </div>
          <div className="mt-4">
            <p>{post.content}</p>
          </div>
          {post.image && (
            <img
              src={post.image}
              alt={`Image for ${post.username}'s post`}
              className="mt-4 rounded-lg"
            />
          )}
          <div className="mt-4 flex justify-between">
            <button className="flex items-center text-[#606872]">
              <HandThumbUpIcon className="w-5 h-5 mr-1" />
              {post.likesCount} {post.likesCount === 1 ? "Like" : "Likes"}
            </button>
            <button className="flex items-center text-[#606872]">
              <ChatBubbleLeftIcon className="w-5 h-5 mr-1" />
              {post.commentsCount}{" "}
              {post.commentsCount === 1 ? "Comment" : "Comments"}
            </button>
            <button className="flex items-center text-[#606872]">
              <ShareIcon className="w-5 h-5 mr-1" />
              Share
            </button>
          </div>
        </div>
        <div className="max-w-lg mx-auto mt-4">
          <span className="isolate inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              <HeartIcon
                className={`h-6 w-6 shrink-0 cursor-pointer ${
                  isLiked ? "text-red-500" : "text-gray-400"
                }`}
                onClick={handleLikeToggle}
              />
              {isLiked ? "unlike" : "like"}
            </button>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              {post.likesCount}
            </button>
          </span>
        </div>
        <div className="max-w-lg mx-auto mt-4">
          <Comment postId={id} />
        </div>
      </>
    );
}

export default Detail;
