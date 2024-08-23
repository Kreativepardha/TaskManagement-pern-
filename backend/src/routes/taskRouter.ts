import { Router } from "express";
import { createTask, getAllTasks, getTask, updateTask, deleteTask } from "../controllers/taskController";


const router = Router()

router.post("/", createTask)
router.get("/", getAllTasks)
router.get("/:id", getTask)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)


export {
    router as taskRouter
}