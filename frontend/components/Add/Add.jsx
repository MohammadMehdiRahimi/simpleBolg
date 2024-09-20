import React, { useEffect, useState, useRef } from "react";
import style from "./Add.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { tlds } from "@hapi/tlds";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setUserIn } from "../../Redux/auth/authSlice";
export default function EditPost() {
  const [postImage, setPostImage] = useState(null);
  const dispatch = useDispatch();
  const image = useRef();
  const title = useRef();
  const text = useRef();
  const showImage = useRef();
  const navigate = useNavigate();
  const submitHandle = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title.current.value);
    formData.append("text", text.current.value);
    formData.append("postImage", image.current.files[0]);
    try {
      const { data } = await axios.post("/post/add", formData, {
        headers: { token: localStorage.getItem("token") },
      });
    if (data.success) {
        toast("پست با موفقیت ارسال  شد.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getAuth = async () => {
      try {
        const { data } = await axios.get("/auth", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        if (data.access) {
          dispatch(setUserIn(true));
        }
      } catch (error) {
        toast.error("زمان به پایان رسید لطفا دوباره وارد شوید.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/login");
        }, [2000]);
      }
    };
    getAuth();
  }, []);
  return (
    <div className="container">
      <form className={"row mt-4 " + style.wrapper} onSubmit={submitHandle}>
        <div className="col-8 offset-2 rounded  d-flex align-items-center flex-column justify-content-around">
          <input
            type="file"
            name="addFile"
            id="addFile"
            className="d-none"
            ref={image}
            onChange={(e) => setPostImage(e.target.files[0])}
          />
          <div className="" ref={showImage} id="showImage">
            <label htmlFor="addFile" className={"  " + style.imageWrapper}>
              <i className="fa-regular fa-image"></i>
              <span>اضافه کردن تصویر</span>
            </label>
          </div>

          <div className={style.addTitle}>
            <div className={style.inputGroup}>
              <label htmlFor="title">عنوان : </label>
              <input
                type="text"
                placeholder="عنوان را وارد نمایید ... "
                id="title"
                ref={title}
              />
            </div>
            <textarea
              name=""
              id="describtion"
              placeholder="متن مورد نظر را وارد نمایید ... "
              ref={text}
            ></textarea>
            <div className={"  " + style.button}>
              <button type="submit">ارسال</button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer rtl />
    </div>
  );
}
