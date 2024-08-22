// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import React from "react";
// import { useEffect } from "react";
// import "../public/css/bootstrap.css";
// import "../public/css/_reset.css";

// import axios from "axios";
// import { useCookies } from "react-cookie";

// import TopBar from "../components/TopBar/TopBar.jsx";
// import Home from "../components/Home/Home.jsx";
// import Single from "../components/Single/Single.jsx";
// import Add from "../components/Add/Add.jsx";
// import Setting from "../components/Setting/Setting.jsx";
// import Login from "../components/Login/Login.jsx";
// import Register from "../components/Register/Register.jsx";
// import PageNotFound from "../components/PageNotFound/PageNotFound.jsx";

// axios.defaults.baseURL = "http://localhost:3000";
// export default function App() {
//   const [cookies, setCookies] = useCookies(["token"]);
//   useEffect(() => {});
//   return (
//     <>
//       <TopBar />
//       <div className={" top-1 "}>
//         <Router>
//           <Routes>
//             {/* <Route path="/dashboard" element={<Home />} /> */}
//             <Route path="/:postId" element={<Single />} />
//             <Route path="/add" element={<Add />} />
//             <Route path="/setting" element={<Setting />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/not-found" element={<PageNotFound />} />
//             <Route path="/" />
//           </Routes>
//         </Router>
//       </div>
//     </>
//   );
// }

import {

  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import "../public/css/bootstrap.css";
import "../public/css/_reset.css";

import axios from "axios";
import { CookiesProvider } from "react-cookie";

import TopBar from "../components/TopBar/TopBar.jsx";
import Dashboard from "../components/Dashboard/Dashboard.jsx";

import Single from "../components/Single/Single.jsx";
import Add from "../components/Add/Add.jsx";
import Setting from "../components/Setting/Setting.jsx";
import Login from "../components/Login/Login.jsx";
import Register from "../components/Register/Register.jsx";
import PageNotFound from "../components/PageNotFound/PageNotFound.jsx";

axios.defaults.baseURL = "http://localhost:3000";
export default function App() {
  useEffect(() => {});
  return (
    <CookiesProvider>
      <TopBar />
      <div className={" top-1 "}>
     
          <Routes>
            <Route path="/post/:postId" element={<Single />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<Add />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/not-found" element={<PageNotFound />} />
            {/* <Route path="*" element={<Navigate to="/not-found" />} /> */}
          </Routes>
    
      </div>
    </CookiesProvider>
  );
}
