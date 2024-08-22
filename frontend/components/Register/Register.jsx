import React from "react";
import style from "./Register.module.css";
import Joi from "joi";
import { useRef } from "react";
import axios from "axios";
import { tlds } from "@hapi/tlds";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
export default function Register() {
  const emailVal = useRef();
  const userNameVal = useRef();
  const passVal = useRef();
  const confirmPassVal = useRef();
  const navigate = useNavigate();
  async function submitHandler(e) {
    e.preventDefault();
    let email = emailVal.current.value;
    let userName = userNameVal.current.value;
    let pass = passVal.current.value;
    let confirmPass = confirmPassVal.current.value;
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: tlds } })
        .required(),
      userName: Joi.string().min(3).max(15).required().alphanum(),
      pass: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
      confirmPass: Joi.ref("pass"),
    });

    let validate = schema.validate({
      email,
      userName,
      pass,
      confirmPass,
    });

    if (validate.error === undefined) {
      try {
        const response = await axios.post("/register", {
          email,
          userName,
          pass,
          confirmPass,
        });
        if (response.data.success) {
          localStorage.setItem("token", response.data.body.token);
          console.log(response.data.body.token);
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
        const { response } = err;
        const { data } = response;
        console.log(data);
        if (data.success === undefined) {
          toast.error("ارتباط با سرور قطع است", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (data.success === false) {
          toast.error(" اکانتی با این ایمیل یا نام کاربری ثبت شده است", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } else {
      let toasti = "";
      let kindError = validate.error.message.split('"')[1];
      switch (kindError) {
        case "email":
          toasti = "لطفا ایمیل خود را به درستی وارد نمایید";
          break;
        case "userName":
          toasti = "لطفا نام کاربری خود را به درستی وارد نمایید";
          break;
        case "pass":
          toasti = "لطفا رمز عبور خود را به درستی وارد نمایید";
          break;
        case "confirmPass":
          toasti = "لطفا تکرار رمز عبور خود را به درستی وارد نمایید";
          break;
        default:
          return;
      }
      toast.error(toasti, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <>
      <div className={" " + style.wrapper}></div>;
      <div className={"col-4 offset-4 mt-5 rounded-4  " + style.container}>
        <form action="" onSubmit={submitHandler}>
          <h1> ثبت نام </h1>
          <div className={"  " + style.email}>
            <label htmlFor="email"> ایمیل </label>
            <input type="text" id="email" autoFocus ref={emailVal} />
          </div>
          <div className={"  " + style.userName}>
            <label htmlFor="userName"> نام کاربری</label>
            <input type="text" id="userName" ref={userNameVal} />
          </div>
          <div className={"  " + style.password}>
            <label htmlFor="password">رمز عبور</label>
            <input type="password" id="password" ref={passVal} />
          </div>
          <div className={"  " + style.password}>
            <label htmlFor="confirmPassword">تکرار رمز عبور</label>
            <input type="password" id="confirmPassword" ref={confirmPassVal} />
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
      <ToastContainer rtl />
    </>
  );
}
