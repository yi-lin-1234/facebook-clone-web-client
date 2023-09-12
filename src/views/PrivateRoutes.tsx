import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { getUserByEmail } from "../service/user";
import { setUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

function PrivateRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(false);
      if (user && user.email) {
        try {
          const data = await getUserByEmail(user.email);
          const userInfo = {
            id: data.id,
            username: data.username,
            email: data.email,
            picture: data.picture,
            about: data.about,
          };
          dispatch(setUser(userInfo));
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
