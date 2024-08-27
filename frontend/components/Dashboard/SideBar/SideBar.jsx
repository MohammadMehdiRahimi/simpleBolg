import React, { useState, useEffect, useRef } from "react";
import style from "./SideBar.module.css";
import { Link } from "react-router-dom";
import Setting from "../../Setting/Setting";
import { useSelector } from "react-redux";

export default function SideBar() {
  const userName = useSelector((state) => state.profileDetails.userName);
  const about = useSelector((state) => state.profileDetails.about);
  const userIn = useSelector((state) => state.auth.userIn);
  const profileImage = useSelector(
    (state) => state.profileDetails.profileImage
  );
  let category = useSelector((state) => state.profileDetails.category);
  category = `${category}`;
  category = category.split(",");
  const changeProfile = useSelector((state) => state.auth.changeProfile);
  const image = useRef();
  const aboutText = useRef();
  useEffect(() => {
    image.current.src = `http://localhost:3000/profileImage/${profileImage}`;
    aboutText.current.innerText = about;
  }, [userName, userIn]);
  return (
    <div className={"col-2 mr-5 fs-14 " + style.SideBar}>
      <div className={"  " + style.aboutMe + " " + style.SideBarItem}>
        <Link
          className="align-self-start fs-18 text-brown cursor-pointer"
          to="/setting"
        >
          <i className={"fa-regular fa-pen-to-square   " + style.editIcon}></i>
        </Link>
        <h4 className={"  " + style.title}>درباره من</h4>
        <img
          src="https://th.bing.com/th/id/OIP.jf3W3MM5DiBiYes-e1C_qwHaIe?w=980&h=1121&rs=1&pid=ImgDetMain"
          alt=""
          ref={image}
        />
        <p className={style.aboutMeText} ref={aboutText}>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است
        </p>
      </div>
      <div className={"  " + " " + style.SideBarItem}>
        <h4 className={"  " + style.title}>علاقه مندی ها</h4>
        <ul className={style.categoryList}>
          {category && category.length > 0
            ? category.map((item) => <li key={item}>{item}</li>)
            : ""}
        </ul>
      </div>
      <div className={"  " + " " + style.SideBarItem}>
        <h4 className={"  " + style.title}> دنبال کردن</h4>
        <div className={"  " + style.socialItem}>
          <i className="fa-brands fa-instagram fs-24 mx-2"></i>
          <i className="fa-brands fa-telegram fs-24 mx-2"></i>
          <i className="fa-brands fa-twitter fs-24 mx-2"></i>
        </div>
      </div>
    </div>
  );
}
