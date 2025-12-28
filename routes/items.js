import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import userData from "../models/userData.js"
const router = express.Router();


router.get("/list", protect, async (req, res) => {
  try {
    const tasks = await userData.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/add", protect, allowRoles("senior"), async (req, res) => {
  try {
    
    const { taskTitle ,taskDescription,assignedTo,status} = req.body;

    if (! taskTitle && !taskDescription && !assignedTo && !status) {
      return res.status(400).json({ message: "Task name is required" });
    }

 
    const task = await userData.create({
      taskTitle ,taskDescription,assignedTo,status,
      createdBy: req.user.role,
    });

    res.status(201).json(task); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


router.put("/update/:id", protect, allowRoles("senior", "junior"), async (req, res) => {
  try {
    const { taskTitle, taskDescription, assignedTo, status } = req.body;

    const task = await userData.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role === "senior") {
  
      if (taskTitle !== undefined) task.taskTitle = taskTitle;
      if (taskDescription !== undefined) task.taskDescription = taskDescription;
      if (assignedTo !== undefined) task.assignedTo = assignedTo;
      if (status !== undefined) task.status = status;
    } else if (req.user.role === "junior") {
  
      if (status !== undefined) task.status = status;
   
      if (taskTitle || taskDescription || assignedTo) {
        return res.status(403).json({ message: "Juniors can only update status" });
      }
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});



router.delete("/delete/:id", protect, allowRoles("senior"), async (req, res) => {
  try {
    const task = await userData.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


export default router;
