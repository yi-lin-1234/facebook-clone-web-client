import axios from "axios";
import { CreatePostBody, UpdatePostBody } from "../types/type";

//dev
// const instance = axios.create({
//   baseURL: "http://localhost:8080",
// });

//prod
const instance = axios.create({
  baseURL: "https://facebook-clone-server-production.up.railway.app",
});

//🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢( POST )🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢

export const createNewPost = async (userId: string, body: CreatePostBody) => {
  await instance.post(`create-post/${userId}`, body);
};

//🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵( GET )🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵

export const getAllPosts = async () => {
  const response = await instance.get("all-posts");
  return response.data;
};

export const getPostsByUserId = async (userId: string) => {
  const response = await instance.get(`user/${userId}/posts`);
  return response.data;
};

export const getPostById = async (id: string) => {
  const response = await instance.get(`post/${id}`);
  return response.data;
};

export const getLikedPostsByUser = async (userId: string) => {
  const response = await instance.get(`liked-posts/${userId}`);
  return response.data;
};

//🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡( PUT )🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡

export const updatePostById = async (id: string, body: UpdatePostBody) => {
  await instance.put(`update-post/${id}`, body);
};

//🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴( DELETE )🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴

export const deletePostById = async (id: string) => {
  await instance.delete(`delete-post/${id}`);
};
