import React from "react";
import style from "./SideBar.module.css";

export default function SideBar() {
  return (
    <div className={"col-2 mr-5 fs-14 " + style.SideBar}>
      <div className={"  " + style.aboutMe + " " + style.SideBarItem}>
        <h4 className={"  " + style.title}>درباره من</h4>
        <img
          src="https://th.bing.com/th/id/OIP.jf3W3MM5DiBiYes-e1C_qwHaIe?w=980&h=1121&rs=1&pid=ImgDetMain"
          alt=""
        />
        <p className={style.aboutMeText}>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است
        </p>
      </div>
      <div className={"  " + " " + style.SideBarItem}>
        <h4 className={"  " + style.title}>علاقه مندی ها</h4>
        <ul className={style.categoryList}>
          <li>زندگی سالم</li>
          <li>موسیقی</li>
          <li>ورزش</li>
          <li>تکنولوژی</li>
          <li>سینما</li>
          <li>استایل</li>
        </ul>
      </div>
      <div className={"  "  + " " + style.SideBarItem}>
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
