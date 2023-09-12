import axios from "axios";

//dev
// const instance = axios.create({
//   baseURL: "http://localhost:8080",
// });

//prod
const instance = axios.create({
  baseURL: "https://facebook-clone-server-production.up.railway.app",
});

//🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢( POST )🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢

export const likePost = async (postId: string, userId: string) => {
  await instance.post(`like-post/${postId}`, null, {
    params: {
      userId: userId,
    },
  });
};

//🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵( GET )🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵

export const checkLikeStatus = async (postId: string, userId: string) => {
  const response = await instance.get("isLiked", {
    params: {
      postId: postId,
      userId: userId,
    },
  });
  return response.data;
};

//🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴( DELETE )🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴

export const unlikePost = async (postId: string, userId: string) => {
  await instance.delete(`unlike-post/${postId}`, {
    params: {
      userId: userId,
    },
  });
};
