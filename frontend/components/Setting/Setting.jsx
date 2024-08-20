import React from "react";
import style from "./Setting.module.css";
export default function Setting() {
  return (
    <div className="container">
      <div className="row">
        <div
          className={
            "col-8 offset-2 mt-4 d-flex flex-column gap-4  " + style.setting
          }
        >
          <div
            className={
              "d-flex justify-content-between align-items-center my-4 " +
              style.titlePage
            }
          >
            <h1>تنظیمات پروفایل</h1>
            <p className="cursor-pointer">حذف اکانت</p>
          </div>

          <div
            className={
              "d-flex justify-content-between align-items-start  " +
              style.wrapper
            }
          >
            <form action="" method="post" className={style.inputGroup}>
              <div className={"  " + style.userName}>
                <label htmlFor="userName">نام کاربری</label>
                <input type="text" autoFocus id="userName" />
              </div>
              <div className={"  " + style.email}>
                <label htmlFor="email">ایمیل</label>
                <input type="email" id="email" />
              </div>
              <div className={"  " + style.password}>
                <label htmlFor="password">رمز عبور</label>
                <input type="password" id="password" />
              </div>
              <div className={"  " + style.confirmPassword}>
                <label htmlFor="confirmPassword">تکرار رمز عبور</label>
                <input type="password" id="confirmPassword" />
              </div>
            </form>
            <div className={"d-flex w-25 flex-column  " + style.profileImage}>
              <h3>تصویر نمایه</h3>
              <div className={"  " + style.image}>
                <img
                  src="https://th.bing.com/th/id/OIP.jf3W3MM5DiBiYes-e1C_qwHaIe?w=980&h=1121&rs=1&pid=ImgDetMain"
                  alt=""
                />
                <input
                  type="file"
                  name="addProfile"
                  id="addProfile"
                  className="d-none"
                />
                <label htmlFor="addProfile">
                  <i class="fa-regular fa-pen-to-square"></i>
                </label>
              </div>
            </div>
          </div>

          <button className="btn btn-info w-25 align-self-center mt-2" type="submit">به روز رسانی</button>
        </div>
      </div>
    </div>
  );
}
