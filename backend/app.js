import express from "express";
import router from "./routes/router.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.listen(3000, () => console.log("listen at : http://localhost:3000"));
