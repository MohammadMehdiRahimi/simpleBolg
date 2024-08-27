import React, { useEffect, useRef } from "react";
import style from "./Setting.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tlds } from "@hapi/tlds";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setChangeProfile, setUserIn } from "../../Redux/auth/authSlice.js";

export default function Setting() {
  const navigate = useNavigate();
  const newImageFile = useRef();
  const userNameVal = useRef();
  const passwordVal = useRef();
  const emailVal = useRef();
  const confirmPasswordVal = useRef();
  const aboutVal = useRef();
  const categoryVal = useRef();
  const profile = useRef();
  const dispatch = useDispatch();
  const [userId, setUserID] = useState(null);
  const token = localStorage.getItem("token");
  const changeProfile = useSelector((state) => state.auth.changeProfile);
  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (passwordVal.current.value !== confirmPasswordVal.current.value) {
      toast.error(" رمز عبور و تکرار رمز عبور یکسان نیست ! ", {
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
      if (userNameVal.current.value !== "") {
        formData.append("userName", userNameVal.current.value);
      }
      if (passwordVal.current.value !== "") {
        formData.append("password", passwordVal.current.value);
      }

      if (emailVal.current.value !== "") {
        formData.append("email", emailVal.current.value);
      }
      if (aboutVal.current.value !== "") {
        formData.append("about", aboutVal.current.value);
      }
      if (categoryVal.current.value !== "") {
        formData.append("category", categoryVal.current.value);
      }
      if (userId !== "") formData.append("userId", userId);
      if (!!newImageFile.current.files[0]) {
        formData.append("profileImage", newImageFile.current.files[0]);
      }
      try {
        const { data } = await axios.post("/user/profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (data.success) {
          toast("پروفایل بروز رسانی شد", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          dispatch(setChangeProfile(true));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(changeProfile);
  const deleteAccountHandle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete("/deleteaccount", {
        headers: {
          token,
        },
      });
      if (data.success) {
        toast("اکانت شما با موفقیت حذف شد", {
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
      localStorage.removeItem("token");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAuth = async () => {
      try {
        const { data } = await axios.get("/auth", {
          headers: {
            token,
          },
        });
        console.log(token);
        if (!data.access) {
          navigate("/login");
        }
        setUserID(data.body.userId);
        dispatch(setUserIn(true));
      } catch (error) {
        navigate("/login");
      }
    };
    if (token) {
      getAuth();
    }
    const getDetails = async () => {
      try {
        const { data } = await axios.get("/details", {
          headers: { token },
        });
        console.log(data.body);
        if (data.body.success) {
          let [bodyObj] = data.body.body;
          userNameVal.current.value = bodyObj.userName;
          emailVal.current.value = bodyObj.email;
          aboutVal.current.value = bodyObj.about;
          categoryVal.current.value = bodyObj.category;
          profile.current.src = `http://localhost:3000/profileImage/${bodyObj.profile}`;
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, [token, changeProfile]);

  return (
    <div className="container">
      <div className="row">
        <div
          className={
            "col-10 offset-1 mt-4 d-flex flex-column gap-4  " + style.setting
          }
        >
          <div
            className={
              "d-flex justify-content-between align-items-center mt-4 " +
              style.titlePage
            }
          >
            <h1>تنظیمات پروفایل</h1>
            <p className="cursor-pointer" onClick={deleteAccountHandle}>
              حذف اکانت
            </p>
          </div>
          <form
            onSubmit={formSubmit}
            action=""
            id="uploadForm"
            encType="multipart/form-data"
            method="post"
            className={"d-flex  justify-content-between" + style.form}
          >
            <div className={"mb-5  " + style.inputGroup}>
              <div className={"  " + style.userName}>
                <label htmlFor="userName">نام کاربری</label>
                <input type="text" autoFocus id="userName" ref={userNameVal} />
              </div>
              <div className={"  " + style.email}>
                <label htmlFor="email">ایمیل</label>
                <input type="email" id="email" ref={emailVal} />
              </div>
              <div className={"  " + style.password}>
                <label htmlFor="password">رمز عبور</label>
                <input type="password" id="password" ref={passwordVal} />
              </div>
              <div className={"  " + style.confirmPassword}>
                <label htmlFor="confirmPassword">تکرار رمز عبور</label>
                <input
                  type="password"
                  id="confirmPassword"
                  ref={confirmPasswordVal}
                />
              </div>
              <div className={"  " + style.aboutMe}>
                <label htmlFor="aboutMe">درباره من</label>
                <textarea type="text" id="aboutMe" ref={aboutVal}></textarea>
              </div>
              <div className={"  " + style.category}>
                <label htmlFor="category"> علاقه مندی ها</label>
                <input type="text" id="category" ref={categoryVal} />
                <div id="categoryAdd"></div>
                <button className="btn btn-outline-primary w-25 fs-12 align-self-center">
                  اضافه کردن
                </button>
              </div>
            </div>

            <div
              className={
                "d-flex flex-column align-items-center gap-4 justify-content-center  " +
                style.profileImage
              }
            >
              <h3>تصویر نمایه</h3>
              <div className={"  " + style.image}>
                <img
                  src="https://th.bing.com/th/id/OIP.jf3W3MM5DiBiYes-e1C_qwHaIe?w=980&h=1121&rs=1&pid=ImgDetMain"
                  alt=""
                  ref={profile}
                />

                <input
                  type="file"
                  name="addProfile"
                  id="addProfile"
                  className="d-none"
                  ref={newImageFile}
                />
                <label htmlFor="addProfile">
                  <i className="fa-regular fa-pen-to-square"></i>
                </label>
              </div>
              <button
                className="btn btn-info w-50 align-self-center my-3"
                type="submit"
              >
                به روز رسانی
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer rtl />
    </div>
  );
}
