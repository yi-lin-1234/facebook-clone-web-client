import { useState, useEffect, FormEvent } from "react";
import { useSelector } from "react-redux";
import { getCommentsByPostId, createNewComment } from "../service/comment";
import { RootState } from "../types/type";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ListItem from "../components/ListItem";
import { CommentObj } from "../types/type";

function Comment({ postId }: { postId: string }) {
  const [input, setInput] = useState<string>("");
  const [comments, setComments] = useState<CommentObj[]>([]);
  const currentUser = useSelector((state: RootState) => state.user.value);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getCommentsByPostId(postId);
        console.log(data);
        setComments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [postId]);

  async function handleOnSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await createNewComment(currentUser.id, postId, input);
      toast.success("create new comment successfully!");
      setInput("");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while create new comment.");
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="isolate bg-white">
      <ToastContainer position="bottom-right" />
      <form onSubmit={handleOnSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <textarea
              rows={5}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="  add your comment..."
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 mt-2">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            post
          </button>
        </div>
      </form>

      <div className="mx-auto max-w-xl mt-5">
        <div>
          {comments.length > 0 &&
            comments.map((comment) => (
              <ListItem comment={comment} key={comment.id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Comment;
