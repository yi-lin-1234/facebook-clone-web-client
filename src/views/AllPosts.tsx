import { getAllPosts } from "../service/post";
import { useState, useEffect } from "react";
import List from "../components/List";
import { Post } from "../types/type";

function AllPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initialSetUp() {
      setIsLoading(true);
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    initialSetUp();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return <List posts={posts} />;
}

export default AllPosts;
