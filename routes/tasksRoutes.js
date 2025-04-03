import express from "express";
import { createTaskController , getAllTaskController , deleteTaskController , updateTaskController } from "../controller/tasksController.js";
import protectRoute from "../middleware/authJwt.js";

const router = express.Router();

router.post("/create-task", protectRoute, createTaskController);
router.get("/get-all-tasks/:userId", protectRoute, getAllTaskController);
router.delete("/delete-task/:id", protectRoute, deleteTaskController);
router.patch("/update-task/:id", protectRoute, updateTaskController);

export default router;
