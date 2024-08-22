import express from "express";
import Controller from "../controller/Controller.js";
import multer from "multer";
import path from "path";
const router = express.Router();
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "File/ProfileImage"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.split(".")[0] +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/auth", Controller.getAuth);
router.get("/details", Controller.auth, Controller.getDetails);
router.post(
  "/user/profile",
  upload.single("profileImage"),
  Controller.updateProfile
);

export default router;
