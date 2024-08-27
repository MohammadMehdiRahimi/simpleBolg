import React from "react";
import { useEffect, useState, useRef } from "react";
import style from "./Posts.module.css";
import Post from "./Post.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const navigate = useNavigate();
  const [postsArray, setPostsArray] = useState([]);
  const [flag, setFlag] = useState(true);
  const postHandle = (e) => {
    e.preventDefault();
    const postid = e.target.getAttribute("data-postid");
    if (postid > 0) {
      navigate(`/post/${postid}`);
    }
  };
  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get("/user/posts", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        if (data.success && flag) {
          setPostsArray([...data.body]);
          setFlag(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (postsArray.length > 0) {
      postsArray.map((item) => console.log(item.title));
    }
    getPosts();
  }, [flag]);

  return (
    <div className={"  " + style.posts} onClick={postHandle}>
      {!flag
        ? postsArray.map((item) => item.title === null  ? " " : <Post key={item.postId} data={item} />)
        : ""}
    </div>
  );
}
