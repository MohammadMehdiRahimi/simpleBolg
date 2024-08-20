import React from "react";
import style from "./Login.module.css";
export default function Login() {
  return (
    <>
      <div className={" " + style.wrapper}></div>;
      <div className={"col-4 offset-4 mt-5 rounded-4  " + style.container}>
        <form action="">
          <h1>ورود به حساب کاربری</h1>
          <div className={"  " + style.userName}>
            <label htmlFor="userName"> نام کاربری</label>
            <input type="text" id="userName" autoFocus />
          </div>
          <div className={"  " + style.password}>
            <label htmlFor="password">رمز عبور</label>
            <input type="text" id="password" />
          </div>
          <div className={"d-flex flex-row  " + style.button}>
           <div className={'  ' + style.goToRegister}>
           <p>حساب کاربری ندارید؟</p>
           </div>
            <button className="btn btn-success" type="submit">
              ورود
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
