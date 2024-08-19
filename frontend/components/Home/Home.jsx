import React from "react";
import style from "./Home.module.css";

import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import Posts from "./Post/Posts";
export default function Home() {
  return (
    <div className={"row mt-5 " + style.container}>
      <div className="d-flex  flex-column w-100  ">
        <Header />
        <div className={"d-flex mt-4 " + style.body}>
          <SideBar />
          <Posts />
        </div>
      </div>
    </div>
  );
}
