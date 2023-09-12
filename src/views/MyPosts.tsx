import { getPostsByUserId } from "../service/post";
import { useState, useEffect } from "react";
import List from "../components/List";
import { Post } from "../types/type";
import { RootState } from "../types/type";
import { useSelector } from "react-redux";

function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentUser = useSelector((state: RootState) => state.user.value);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getPostsByUserId(currentUser.id);
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, [currentUser.id]);

  if (isLoading) return <div>Loading...</div>;

  return <List posts={posts} />;
}

export default MyPosts;
