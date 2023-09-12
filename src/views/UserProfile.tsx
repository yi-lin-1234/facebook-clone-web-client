import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPostsByUserId } from "../service/post";
import { getUserById } from "../service/user";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { Post, RootState, User } from "../types/type";
import List from "../components/List";

function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const currentUser = useSelector((state: RootState) => state.user.value);
  const isMySelf = id === currentUser.id;

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      if (!id) {
        console.log("No ID provided");
        return;
      }
      try {
        const user = await getUserById(id);
        setUser(user);
        console.log(user);
        const posts = await getPostsByUserId(id);
        setPosts(posts);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  if (user)
    return (
      <div className="bg-background-grey p-10 h-screen">
        <div className="overflow-hidden border rounded-lg bg-white shadow-md">
          <div className="bg-white border-b border-gray-200">
            <div className="p-6 sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="flex-shrink-0">
                  <img
                    className="mx-auto h-20 w-20 rounded-full object-cover"
                    src={user.picture}
                    alt="user"
                  />
                </div>
                <div className="text-center sm:mt-0 sm:pt-1 sm:text-left">
                  <p className="text-sm font-medium text-gray-600">
                    welcome to my profile!
                  </p>
                  <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                    {user.username}
                  </p>
                </div>
              </div>
              {!isMySelf && (
                <div className="mt-5 flex justify-center sm:mt-0">
                  <Link to={"/dashboard/direct-message"} state={user}>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <EnvelopeIcon
                        className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />

                      <span>Message</span>
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <div className="p-6 text-sm font-medium text-gray-600 border-t border-gray-200">
              {user.about}
            </div>
          </div>
        </div>
        {posts.length > 0 && <List posts={posts} />}
      </div>
    );
}

export default UserProfile;
