import express from "express";
import TaskController from "../controller/taskController.js";
const router = express.Router();
router.get("/" , )
router.get("/students", TaskController.getStudents);
router.post("/login" , TaskController.login)
export default router;
