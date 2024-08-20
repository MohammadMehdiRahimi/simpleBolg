import React from "react";
import style from "./Register.module.css";
export default function Register() {
  return (
    <>
      <div className={" " + style.wrapper}></div>;
      <div className={"col-4 offset-4 mt-5 rounded-4  " + style.container}>
        <form action="">
          <h1> ثبت نام </h1>
          <div className={"  " + style.email}>
            <label htmlFor="email"> ایمیل </label>
            <input type="text" id="email" autoFocus />
          </div>
          <div className={"  " + style.userName}>
            <label htmlFor="userName"> نام کاربری</label>
            <input type="text" id="userName"  />
          </div>
          <div className={"  " + style.password}>
            <label htmlFor="password">رمز عبور</label>
            <input type="text" id="password" />
          </div>
          <div className={"  " + style.password}>
            <label htmlFor="password">تکرار رمز عبور</label>
            <input type="text" id="password" />
          </div>
          <div className={"d-flex flex-row  " + style.button}>
            <div className={"  " + style.goToRegister}>
              <p>حساب کاربری دارید؟</p>
            </div>
            <button className="btn btn-info" type="submit">
              ثبت نام
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
