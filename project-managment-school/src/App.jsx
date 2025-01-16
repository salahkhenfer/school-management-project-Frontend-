import { useEffect, useState } from "react";
import "./App.css";
import LoadingFirstPage from "./components/loading/LoadingFirstPage";
import SideBar from "./components/adminsCompnents/navbar/SideBar";
import Header from "./components/adminsCompnents/navbar/Header";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkauth, selectAuth } from "./Redux/slices/authSlice";
import { checkauthApi } from "./apiCalls/authCalls";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector(selectAuth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const userData = await checkauthApi();
        console.log(userData);

        dispatch(checkauth(userData.user));
      } catch (err) {
        console.error("Auth check failed:", err);
        dispatch(checkauth(null));
      } finally {
        setLoading(false);
      }
    };

    // fetchAuthStatus();
  }, []);

  // if (loading) {
  //   return <LoadingFirstPage />;
  // }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role === "admin" || user.role === "sub-admin") {
    return (
      <div className="font-cairo">
        <Header isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
        <div className="flex">
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="pt-20 h-[calc(100vh-1rem)] overflow-y-scroll w-full px-4">
            <Outlet />
          </div>
        </div>
      </div>
    );
  } else if (user.role === "teacher") {
    return <Navigate to="/teachers" />;
  } else if (user.role === "parent") {
    return <Navigate to="/parents" />;
  }

  // Fallback for unknown roles
  return <Navigate to="/login" />;
}

export default App;
