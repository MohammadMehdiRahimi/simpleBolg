import React, { useEffect, useState, useRef } from "react";
import style from "./Single.module.css";
import { useParams } from "react-router-dom";
import SideBar from "../Dashboard/SideBar/SideBar";
import axios from "axios";
import { tlds } from "@hapi/tlds";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { setUserIn } from "../../Redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Single() {
  const [showEdit, setShowEdit] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();
  const image = useRef();
  const titlePost = useRef();
  const describtion = useRef();
  const dispatch = useDispatch();
  const creatore = useRef();
  const userIn = useSelector((state) => state.auth.userIn);
  const [userIdIn, setUserIdIn] = useState(null);
  const deletePostHandle = async (e) => {
    e.preventDefault();
    const deletConfirm = window.confirm("آیا مطمئن هستید؟");
    if (deletConfirm) {
      const { data } = await axios.delete("/delete/post", {
        headers: {
          token: localStorage.getItem("token"),
          postid: postId,
        },
      });
      if (data.success) {
        toast(" پست با موفقیت حذف شد", {
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
          navigate("/dashboard");
        }, 2000);
      }
    }
  };
  const editHandle = (event) => {
    event.preventDefault();
    navigate(`/post/edit/${postId}`);
  };
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get("/single/post", {
          headers: { postId },
        });
        if (data.success) {
          let { text, title, postImage, userId } = data.body[0];

          if (userId === userIdIn) {
            setShowEdit(true);
          }
          titlePost.current.innerText = title;
          describtion.current.innerText = text;
          if (postImage == null) {
            postImage = "global.png";
          }
          image.current.src = `http://localhost:3000/PostImage/${postImage}`;
        }
      } catch (error) {
        toast.error(error.message, {
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
    };

    const getUserName = async () => {
      try {
        const { data } = await axios.get("/author", { headers: { postId } });

        if (data.success) {
          creatore.current.innerText = `نویسنده : ${data.body}`;
        }
      } catch (error) {
        toast.error(error.message, {
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
    };
    getUserName();

    getPost();
  }, [userIn, userIdIn]);
  useEffect(() => {
    const getAuth = async () => {
      try {
        const { data } = await axios.get("/auth", {
          headers: { token: localStorage.getItem("token") },
        });
        if (data.access) {
          setUserIdIn(data.body.userId);
          dispatch(setUserIn(true));
        } else {
          dispatch(setUserIn(false));
        }
      } catch (error) {}
    };

    getAuth();
  }, [userIdIn]);
  return (
    <div className="d-flex  ">
      {showEdit ? <SideBar /> : ""}
      <div className={"d-flex flex-column mt-3  " + style.singlePost}>
        <img
          src="https://th.bing.com/th/id/R.6743cb9021a910335c6a7f27de6f8e20?rik=UBykEik9KiH8Ow&pid=ImgRaw&r=0"
          alt=""
          ref={image}
        />
        <div className={" d-flex my-2   " + style.centerSection}>
          <h1 ref={titlePost}></h1>
          {showEdit ? (
            <div className={"  " + style.buttons}>
              <i
                className="fa-regular fa-pen-to-square"
                onClick={editHandle}
              ></i>
              <i className="fa-solid fa-trash" onClick={deletePostHandle}></i>
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className={
            "d-flex justify-content-between text-brown  px-5 py-2   " +
            style.author
          }
        >
          <p ref={creatore}>نویسنده : فائزه</p>
          <p>1ساعت پیش </p>
        </div>
        <div className={"  " + style.describtion} ref={describtion}></div>
      </div>
      <ToastContainer rtl />
    </div>
  );
}
