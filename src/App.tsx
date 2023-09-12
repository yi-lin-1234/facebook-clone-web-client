import { Route, Routes } from "react-router-dom";

import Landing from "./views/Landing";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Dashboard from "./views/Dashboard";
import PrivateRoutes from "./views/PrivateRoutes";
import All from "./views/AllPosts";
import Create from "./views/Create";
import MyProfile from "./views/MyProfile";
import Edit from "./views/Edit";
import MyPosts from "./views/MyPosts";
import Detail from "./views/Detail";
import UserProfile from "./views/UserProfile";
import DirectMessage from "./views/DirectMessage";
import MessagePenal from "./views/MessagePenal";
import LikedPosts from "./views/LikedPosts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="all-posts" element={<All />} />
          <Route path="create-post" element={<Create />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="direct-message" element={<DirectMessage />} />
          <Route path="message-penal" element={<MessagePenal />} />
          <Route path="liked-posts" element={<LikedPosts />} />

          <Route path="edit/:id" element={<Edit />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="user-profile/:id" element={<UserProfile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
