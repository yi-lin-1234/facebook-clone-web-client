import {
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { Post, RootState } from "../types/type";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import ActionMenu from "./ActionMenu";
import { deletePostById } from "../service/post";

interface CardProps {
  post: Post;
}

const Card: React.FC<CardProps> = ({ post }) => {
  const currentUser = useSelector((state: RootState) => state.user.value);
  const navigate = useNavigate();

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

  return (
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
        <Link to={`/dashboard/detail/${post.id}`}>
          <button className="flex items-center text-[#606872]">
            <HandThumbUpIcon className="w-5 h-5 mr-1" />
            {post.likesCount} {post.likesCount === 1 ? "Like" : "Likes"}
          </button>
        </Link>
        <Link to={`/dashboard/detail/${post.id}`}>
          <button className="flex items-center text-[#606872]">
            <ChatBubbleLeftIcon className="w-5 h-5 mr-1" />
            {post.commentsCount}{" "}
            {post.commentsCount === 1 ? "Comment" : "Comments"}
          </button>
        </Link>
        <button className="flex items-center text-[#606872]">
          <ShareIcon className="w-5 h-5 mr-1" />
          Share
        </button>
      </div>
    </div>
  );
};

export default Card;
