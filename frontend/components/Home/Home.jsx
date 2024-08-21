import React, { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import style from "./Home.module.css";
import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import Posts from "./Post/Posts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Home() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(token);
    // const checkAuth = async () => {
    //   try {
    //     const response = await axios.get("/dashboard", { headers: { token } });
    //     console.log(response);
    //   } catch (error) {
    //     navigate("/not-found");
    //   }
    // };
    // checkAuth();
  }, [token]);
  return (
    <div className={"row mt-5 " + style.container}>
      <div className="d-flex  flex-column w-100  ">
        <Header />
        <div className={"d-flex mt-4 " + style.body}>
          <SideBar />
          <Posts />
        </div>
      </div>
    </div>
  );
}
