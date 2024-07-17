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
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector(selectAuth);
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    const fetchAuthStatus = async () => {
      setLoading(true);
      try {
        const userData = await checkauthApi();
        console.log(userData.user);
        dispatch(checkauth(userData.user));
      } catch (err) {
        console.error("Error checking authentication status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);

  if (fontLoaded || user) {
    return (
      <div className="font-cairo">
        <Header isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
        <div className="flex">
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div
            className="pt-20 
          h-[calc(100vh-1rem)]
           overflow-y-scroll w-full px-4 "
          >
            <Outlet />
          </div>
        </div>
      </div>
    );
  } else if (!user) {
    return <Navigate to="/login" />;
  } else {
    return <LoadingFirstPage />;
  }
}

export default App;
