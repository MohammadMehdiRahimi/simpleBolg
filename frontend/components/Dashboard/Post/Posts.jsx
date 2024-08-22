import React from "react";
import style from "./Posts.module.css";
import Post from "./Post";
export default function Posts() {
  return (
    <div className={"  " + style.posts}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
