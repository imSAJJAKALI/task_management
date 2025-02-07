import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();


router.post("/", authenticate, createTask);
router.get("/:id?", authenticate, getTasks);
router.patch("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);

export default router;
