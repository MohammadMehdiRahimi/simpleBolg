import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import "../public/css/bootstrap.css";
import "../public/css/_reset.css";

import TopBar from "../components/TopBar/TopBar.jsx";
import Home from "../components/Home/Home.jsx";
export default function App() {
  return (
    <>
      <TopBar />
        <div className={" top-1 "}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </div>
  
    </>
  );
}
