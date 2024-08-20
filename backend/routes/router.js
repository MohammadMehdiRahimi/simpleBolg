import express from "express";
import Controller from "../controller/Controller.js";
const router = express.Router();
router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/dashboard", Controller.auth, (req, res) => {
  return res.json("Helo");
});
export default router;
