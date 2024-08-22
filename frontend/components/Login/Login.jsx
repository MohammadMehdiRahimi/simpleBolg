import React from "react";
import { useRef, useEffect } from "react";
import { tlds } from "@hapi/tlds";
import { ToastContainer, toast } from "react-toastify";
import Joi from "joi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import style from "./Login.module.css";
import { setToken } from "../Redux/auth/authSlice";

export default function Login() {
  /* ---------------------------------- hooks and Variables --------------------------------- */
  const emailVal = useRef();
  const passwordVal = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  let loaclToken = localStorage.getItem("token");

  /* -------------------------------- functions ------------------------------- */

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
        console.log(body);
        dispatch(setToken(body.token));
        localStorage.setItem("token", body.token);

        navigate("/setting");
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
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
        } else {
          toast.error("نام کاربری یا رمز عبور اشتباه است", {
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
    const getAuth = async () => {
      loaclToken = localStorage.getItem("token");
      if (loaclToken) {
        try {
          const { data } = await axios.get("/auth", {
            headers: { token: loaclToken },
          });
          console.log(loaclToken);

          if (data.access) {
            navigate("/setting");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getAuth();
  }, [loaclToken, token]);

  /* ------------------------------ page content ------------------------------ */

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
