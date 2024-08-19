import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import "../public/css/bootstrap.css";
import "../public/css/_reset.css";
import TopBar from "../components/TopBar/TopBar.jsx";

export default function App() {
  return (
    <>
      <TopBar />

      <div className="container-fluid ">
        <div className={"row offset-1 top-1  position-relative"}>
          <Router>
            <Routes></Routes>
          </Router>
        </div>
      </div>
    </>
  );
}
