import React from "react";
import { useRef, useEffect } from "react";
import { tlds } from "@hapi/tlds";
import { ToastContainer, toast } from "react-toastify";
import Joi from "joi";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // استفاده از useNavigate برای ریدایرکت
import { useDispatch, useSelector } from "react-redux";

import style from "./Login.module.css";
import { setToken, getToken } from "../Redux/auth/authSlice";

export default function Login() {
  const emailVal = useRef();
  const passwordVal = useRef();
  const navigate = useNavigate(); // مقداردهی useNavigate
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  async function submitHandle(e) {
    e.preventDefault();
    let email = emailVal.current.value;
    let password = passwordVal.current.value;
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: tlds } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    let validate = schema.validate({
      email,
      password,
    });
    if (validate.error === undefined) {
      try {
        const {
          data: { body },
        } = await axios.post("/login", { email, pass: password });
        dispatch(setToken(body.token));
        navigate("/dashboard"); // ریدایرکت به داشبورد پس از لاگین موفق
      } catch (error) {
        toast.error("Login failed. Please check your credentials.", {
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
    } else {
      let toasti = "";
      let kindError = validate.error.message.split('"')[1];
      switch (kindError) {
        case "email":
          toasti = "لطفا ایمیل خود را به درستی وارد نمایید";
          break;
        case "password":
          toasti = "لطفا رمز عبور خود را به درستی وارد نمایید";
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

  useEffect(() => {
    if (token) {
      console.log("Token after dispatch:", token);
      // navigate("/dashboard"); // می‌توانید در اینجا ریدایرکت کنید
    }
  }, [token]);

  return (
    <>
      <div className={" " + style.wrapper}></div>;
      <div className={"col-4 offset-4 mt-5 rounded-4  " + style.container}>
        <form action="">
          <h1>ورود به حساب کاربری</h1>
          <div className={"  " + style.userName}>
            <label htmlFor="email"> نام کاربری</label>
            <input type="email" id="email" autoFocus ref={emailVal} />
          </div>
          <div className={"  " + style.password}>
            <label htmlFor="password">رمز عبور</label>
            <input type="password" id="password" ref={passwordVal} />{" "}
            {/* تغییر به password */}
          </div>
          <div className={"d-flex flex-row  " + style.button}>
            <div className={"  " + style.goToRegister}>
              <p>حساب کاربری ندارید؟</p>
            </div>
            <button
              onClick={submitHandle}
              className="btn btn-success"
              type="submit"
            >
              ورود
            </button>
          </div>
        </form>
      </div>
      <ToastContainer rtl />
    </>
  );
}
