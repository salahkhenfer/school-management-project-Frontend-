import React, { useEffect } from "react";
import TeacherGroups from "./TeacherGroups/TeacherGroups";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/adminsCompnents/navbar/Header";
import TeacherSideBar from "../components/teachersComponents/TeacherSideBar";
import { checkauthApi } from "../apiCalls/authCalls";
import { useDispatch, useSelector } from "react-redux";
import { checkauth, selectAuth } from "../Redux/slices/authSlice";
import { getTeacherWithUser } from "../apiCalls/teacherCalls";

function TeachersPage() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const fetchGroups = async () => {
    try {
      const newList = await getTeacherWithUser(user); // Fetch the list of groups
      console.log(newList);
      dispatch(checkauth(newList));
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const userData = await checkauthApi();
        dispatch(checkauth(userData.user));
      } catch (err) {
        console.error("Error checking authentication status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthStatus();
    if (user.role === "teacher") {
      fetchGroups();
    }
  }, []);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="font-cairo">
      <Header isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
      <div className="flex">
        <TeacherSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
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
}

export default TeachersPage;
