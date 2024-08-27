import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import style from "./Dashboard.module.css";
import SideBar from "./SideBar/SideBar.jsx";
import Posts from "./Post/Posts.jsx";
import { setToken, setUserIn } from "../../Redux/auth/authSlice.js";

export default function Dashboard() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let localToken = localStorage.getItem("token");
    if (localToken) {
      dispatch(setToken(localToken));
      const checkAuth = async () => {
        try {
          const { data } = await axios.get("/auth", {
            headers: { token: localToken },
          });
          if (data.access) {
            dispatch(setUserIn(true));
          }
        } catch (error) {
          navigate("/login");
        }
      };
      checkAuth();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className={"row mt-5 " + style.container}>
      <div className="d-flex  flex-column w-100  ">
        <div className={"d-flex mt-4 " + style.body}>
          <SideBar />
       
          <Posts />
        </div>
      </div>
    </div>
  );
}
