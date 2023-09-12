import axios from "axios";
import { UserUpdateBody } from "../types/type";

//dev
// const instance = axios.create({
//   baseURL: "http://localhost:8080",
// });

//prod
const instance = axios.create({
  baseURL: "https://facebook-clone-server-production.up.railway.app",
});

//🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢( POST )🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢

export const createNewUser = async (email: string) => {
  const response = await instance.post("create-user", email, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return response.data;
};

//🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵( GET )🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵

export const getUserByEmail = async (email: string) => {
  const response = await instance.get("get-user-by-email", {
    params: {
      email: email,
    },
  });
  return response.data;
};

export const getUserById = async (userId: string) => {
  const response = await instance.get(`get-user-by-id/${userId}`);
  const user = {
    id: response.data.id,
    username: response.data.username,
    email: response.data.email,
    picture: response.data.picture,
    about: response.data.about,
  };
  return user;
};

//🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡( PUT )🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡

export const updateUserById = async (id: string, body: UserUpdateBody) => {
  await instance.put(`update-user/${id}`, body);
};
