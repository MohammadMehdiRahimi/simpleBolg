import React from "react";
import style from "./Header.module.css";
export default function Header() {
  return (
    <div className={style.zero}>
      <div
        className={
          "mt-5  w-100  d-flex  flex-column justify-content-center align-items-center z-1" +
          style.header
        }
      >
        <div
          className={
            " position-relative d-flex justify-content-center flex-column align-items-center fs-28 fw-bold " +
            style.title
          }
        >
          <p>آموزش و پروژه </p>
          <p className="position-absolute fw-bolder fs-title ">عکاسی</p>
        </div>
        <div className={"w-100 " + style.image}>
          <img src="images/camera.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}
