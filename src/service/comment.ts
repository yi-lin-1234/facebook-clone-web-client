import axios from "axios";
import { UpdateCommentBody } from "../types/type";

//dev
// const instance = axios.create({
//   baseURL: "http://localhost:8080",
// });

//prod
const instance = axios.create({
  baseURL: "https://facebook-clone-server-production.up.railway.app",
});

//🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢( POST )🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢

export const createNewComment = async (
  userId: string,
  postId: string,
  content: string
) => {
  await instance.post("create-comment", null, {
    params: {
      userId: userId,
      postId: postId,
      content: content,
    },
  });
};

//🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵( GET )🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵

export const getCommentsByPostId = async (postId: string) => {
  const response = await instance.get(`comments/${postId}`);
  return response.data;
};

//🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡( PUT )🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡

export const updateCommentById = async (
  commentId: string,
  body: UpdateCommentBody
) => {
  await instance.put(`comment/${commentId}`, body);
};

//🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴( DELETE )🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴

export const deleteCommentById = async (commentId: string) => {
  await instance.delete(`comment/${commentId}`);
};
