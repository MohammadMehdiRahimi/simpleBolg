import React, { useEffect, useRef } from "react";
import style from "./HomePost.module.css";
import axios from "axios";

export default function HomePost({ data }) {
  let { category, text, time, title, postImage, postId } = data;
  if (postImage === null) {
    postImage = "global.png";
  }
  if (category != null) {
    category = `${category}`;
    category = category.split(",");
  }
  const image = useRef();
  const creator = useRef();
  useEffect(() => {
    image.current.src = `http://localhost:3000/postimage/${postImage}`;
    const getUserName = async () => {
      try {
        const { data } = await axios.get("/author", { headers: { postId } });
  
        if (data.success) {
          creator.current.innerText = `نویسنده : ${data.body}`;
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
  }, []);
  return (
    <div
      className={
        "d-flex flex-column justify-content-center align-items-center  " +
        style.post
      }
    >
      <div className={"cursor-pointer  " + style.image}>
        <img
          src="https://th.bing.com/th/id/R.6743cb9021a910335c6a7f27de6f8e20?rik=UBykEik9KiH8Ow&pid=ImgRaw&r=0"
          alt=""
          ref={image}
          data-postid={postId}
        />
      </div>

      <div
        data-postid={postId}
        className={"d-flex flex-column  " + style.wrapper}
      >
        <div
          data-postid={postId}
          className={
            "d-flex justify-content-between align-items-center  mt-3 fs-12 fw-bold  " +
            style.details
          }
        >
          <div
            data-postid={postId}
            className={
              "d-flex justify-content-start align-items-center cursor-pointer   " +
              style.category
            }
          >
            {category != null
              ? category.map((item) => (
                  <span data-postid={postId} key={item}>
                    {item}
                  </span>
                ))
              : ""}
          </div>
          <div className={"  " + style.time}> 1 ساعت پیش</div>
          <div className={"  " + style.time} ref={creator}>
            {" "}
          </div>
        </div>
        <div
          data-postid={postId}
          className={
            "fs-26 fw-bolder align-self-center my-3 cursor-pointer  " +
            style.title
          }
        >
          {title}
        </div>
      </div>
      <div className={"  " + style.describtion} data-postid={postId}>
        {text}
      </div>
    </div>
  );
}
