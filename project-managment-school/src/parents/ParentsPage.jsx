import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkauth, selectAuth } from "../Redux/slices/authSlice";
import { getParentWithUser } from "../apiCalls/parentCalls";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/adminsCompnents/navbar/Header";
import { checkauthApi } from "../apiCalls/authCalls";
import { log10 } from "chart.js/helpers";

function ParentsPage() {
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  const fetchParent = async () => {
    try {
      if (!user) return;
      const parentData = await getParentWithUser(user);
      if (parentData) {
        console.log("Parent data:", parentData);
        dispatch(
          checkauth({
            id: parentData.id,
            role: "parent",
            phone: parentData.phoneNumber,
            email: parentData.email,
            name: parentData.fullName,
            ...parentData,
          })
        );
      } else {
        console.error("Parent data is null or undefined.");
      }
    } catch (error) {
      console.error("Error fetching parent:", error);
    }
  };
  const fetchAuthStatus = async () => {
    try {
      const userData = await checkauthApi();
      console.log("User data:", userData);
    } catch (err) {
      dispatch(checkauth(null));
      nav("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      nav("/login");
    } else {
      fetchParent();
    }
    // fetchParent();
    // fetchAuthStatus();
  }, []);

  return (
    <div className="font-cairo">
      <Header isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
      <div className="flex">
        <div className="pt-20 h-[calc(100vh-1rem)] overflow-y-scroll w-full px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ParentsPage;
