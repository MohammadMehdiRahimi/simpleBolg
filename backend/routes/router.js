import express from "express";
import Controller from "../controller/Controller.js";
import multer from "multer";
import path from "path";
const router = express.Router();
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storageProfile = multer.diskStorage({
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

const storagePost = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const dir = path.join(__dirname, "..", "File", "PostImage");
      console.log("Destination directory: ", dir); // بررسی مسیر پوشه
      // در اینجا می‌توانید از fs.access برای بررسی دسترسی به پوشه استفاده کنید
      fs.access(dir, fs.constants.W_OK, (err) => {
        if (err) {
          console.error("Directory is not writable or does not exist: ", err);
          return cb(err); // بازگرداندن خطا به callback
        }
        cb(null, dir);
      });
    } catch (error) {
      console.error("Error in destination function: ", error);
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const filename =
      file.originalname.split(".")[0] +
      Date.now() +
      path.extname(file.originalname);
    console.log("Generated filename: ", filename); // بررسی نام فایل تولید شده
    cb(null, filename);
  },
});

const uploadProfile = multer({ storage: storageProfile });
const uploadPostImage = multer({ storage: storagePost }).single("postImage");
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/auth", Controller.getAuth);
router.get("/details", Controller.auth, Controller.getDetails);
router.post(
  "/user/profile",
  uploadProfile.single("profileImage"),
  Controller.updateProfile
);
router.get("/user/posts", Controller.auth, Controller.getUserPosts);
router.get("/single/post", Controller.getSinglePost);
router.delete("/deleteaccount", Controller.auth, Controller.deleteAccount);
router.delete("/delete/post", Controller.auth, Controller.deletePost);
router.put(
  "/user/posts/edit",
  Controller.auth,
  uploadPostImage,
  Controller.editPost
);
router.get("/allposts", Controller.getAllPosts);
router.get("/author", Controller.getAuthor);
router.post("/post/add", Controller.auth, uploadPostImage, Controller.addPost);

export default router;
