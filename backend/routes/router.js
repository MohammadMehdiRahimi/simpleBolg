// import express from "express";
// import Controller from "../controller/Controller.js";
// const router = express.Router();
// router.post("/register", Controller.register);
// router.post("/login", Controller.login);
// router.get("/dashboard", Controller.auth, (req, res) => {
//   return res.json(true);
// });
// export default router;

import express from "express";
import Controller from "../controller/Controller.js";
import { access } from "fs";
const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/dashboard", Controller.auth, (req, res) => {
  return res.json({ access: true });
});

export default router;
