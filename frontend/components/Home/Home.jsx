import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css";
import Post from "../Dashboard/Post/Post.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const postHandle = (event) => {
    event.preventDefault();
    if (event.target.getAttribute("data-postId") > 0) {
      navigate(`/post/${event.target.getAttribute("data-postId")}`);
    }
  };
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get("/allposts");
        if (data.success) {
          setPosts(data.body);
        } else {
          console.log(data);
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
    const getAuth = async () => {
      try {
        const { data } = await axios.get("/auth", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        console.log(token);
        if (data.access) {
          dispatch(setUserIn(true));
        }
      } catch (error) {}
    };
    if (localStorage.getItem("token")) {
      getAuth();
    }

    getPost();
  }, []);

  return (
    <div className={"row mt-5 " + style.container}>
      <div className="d-flex  flex-column w-100  ">
        <div className={"" + style.body} onClick={postHandle}>
          {posts.length > 0
            ? posts.map((event) =>
                event.title != null ? (
                  <Post
                    key={event.postId}
                    data={event}
                    data-postId={event.postId}
                  />
                ) : (
                  ""
                )
              )
            : ""}
        </div>
      </div>
    </div>
  );
}
