import React from "react";
import style from "./TopBar.module.css";
import { useNavigate } from "react-router-dom";
export default function TopBar() {
  const navigate = useNavigate();
  const topBarHandle = (e) => {
    e.preventDefault();
    if ((e.target.innerText = "خروج")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
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
            <img
              className="rounded-circle  cursor-pointer"
              src="https://th.bing.com/th/id/OIP.KgO2pNoztuGWQX9DJ-s9lAHaE8?rs=1&pid=ImgDetMain"
              alt=""
            />
          </div>
          <div className={" " + style.centerTop}>
            <ul
              className="fs-16 d-flex  align-items-center  "
              onClick={topBarHandle}
            >
              <li className={"cursor-pointer mx-4 mt-2 " + style.menuIcon}>
                صفحه اصلی
              </li>
              <li className={"cursor-pointer mx-4 mt-2 " + style.menuIcon}>
                درباره ما
              </li>
              <li className={"cursor-pointer mx-4 mt-2 " + style.menuIcon}>
                ارتباط با ما
              </li>
              <li className={"cursor-pointer mx-4 mt-2 " + style.menuIcon}>
                خروج
              </li>
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
