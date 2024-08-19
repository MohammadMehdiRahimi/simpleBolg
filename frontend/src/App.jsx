import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Home from "../components/Home/Home.jsx";

import "../public/css/bootstrap.css";
import "../public/css/_reset.css";

jalaliDatepicker.startWatch();
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}
