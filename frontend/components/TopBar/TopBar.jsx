import React, { useEffect, useState, useRef } from "react";
import style from "./TopBar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setAbout,
  setCategory,
  setEmail,
  setProfileImage,
  setUserName,
  setUserId,
} from "../../Redux/profileDetails/profileSlice.js";
import { setUserIn } from "../../Redux/auth/authSlice.js";

export default function TopBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userIn = useSelector((state) => state.auth.userIn);
  const changeProfile = useSelector((state) => state.auth.changeProfile);
  const topBarHandle = (e) => {
    e.preventDefault();
    if (e.target.innerText == "خروج") {
      dispatch(setUserIn(false));
      localStorage.removeItem("token");
      navigate("/");
    } else if (e.target.innerText === "ورود") {
      navigate("/login");
    } else if (e.target.innerText === "ارسال پست") {
      navigate("/post/add");
    } else if (e.target.innerText === "داشبورد") {
      navigate("/dashboard");
    }
  };
  const profileImageRight = useRef();
  useEffect(() => {
    let token = localStorage.getItem("token");
    const getAuth = async () => {
      try {
        const { data } = await axios.get("/details", {
          headers: {
            token,
          },
        });

        if (data.body.success) {
          console.log(data.body);
          const { email, about, category, profile, userName, userId } =
            data.body.body[0];
          dispatch(setEmail(email));
          dispatch(setCategory(category));
          dispatch(setAbout(about));
          dispatch(setProfileImage(profile));
          dispatch(setUserName(userName));
          dispatch(setUserId(userId));
          if (userIn) {
            profileImageRight.current.src = `http://localhost:3000/profileImage/${profile}`;
          }
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (userIn) {
      getAuth();
    }
  }, [userIn, changeProfile]);
  return (
    <div className="container-fluid sticky-top z-3 ">
      <div
        className={
          "row align-items-center  text-brown " + style.backgroundTopBar
        }
      >
        <div className={"col-12 d-flex align-items-center " + style.top}>
          <div
            className={
              "d-flex justify-content-center align-items-center fs-20 " +
              style.rightTop
            }
          >
            <i className="fa-solid fa-magnifying-glass ml-4  cursor-pointer"></i>
            {userIn ? (
              <img
                className="rounded-circle  cursor-pointer"
                src="https://th.bing.com/th/id/OIP.KgO2pNoztuGWQX9DJ-s9lAHaE8?rs=1&pid=ImgDetMain"
                alt=""
                ref={profileImageRight}
                onClick={() => navigate("/setting")}
              />
            ) : (
              ""
            )}
          </div>
          <div className={" " + style.centerTop}>
            <ul
              className="fs-16 d-flex  align-items-center  "
              onClick={topBarHandle}
            >
              <li
                className={"cursor-pointer mx-4 mt-2 " + style.menuIcon}
                onClick={() => navigate("/")}
              >
                صفحه اصلی
              </li>
              {userIn ? (
                <li className={"cursor-pointer mx-4 mt-2 " + style.menuIcon}>
                  ارسال پست
                </li>
              ) : (
                ""
              )}

              {userIn ? (
                <li className={"cursor-pointer mx-4 mt-2 " + style.menuIcon}>
                  داشبورد
                </li>
              ) : (
                ""
              )}

              {userIn ? (
                <li className={"cursor-pointer mx-4 mt-2 " + style.menuIcon}>
                  خروج
                </li>
              ) : (
                <li className={"cursor-pointer mx-4 mt-2 " + style.menuIcon}>
                  ورود
                </li>
              )}
            </ul>
          </div>
          <div
            className={
              "d-flex justify-content-center   cursor-pointer  " + style.leftTop
            }
          >
            <i className="fa-brands fa-instagram fs-24 mx-2"></i>
            <i className="fa-brands fa-telegram fs-24 mx-2"></i>
            <i className="fa-brands fa-twitter fs-24 mx-2"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
