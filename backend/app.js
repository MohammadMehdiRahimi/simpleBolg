import express from "express";
import router from "./routes/router.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import { pathToFileURL } from "url";
import { fileURLToPath } from "url";
const app = express();
app.use(
  cors({
    origin: "*", // مجاز کردن همه منابع
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  "/profileImage",
  express.static(path.join(__dirname, "File", "ProfileImage"))
);
app.use(
  "/postImage",
  express.static(path.join(__dirname, "File", "PostImage"))
);
app.use(router);
app.listen(3000, () => console.log("listen at : http://localhost:3000"));
