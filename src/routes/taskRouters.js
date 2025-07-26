const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
router.use(authMiddleware);


router.post("/", taskController.addTask);
router.get("/", taskController.getAllTasks);
router.get("/:taskId", taskController.getTaskById);
router.put("/:taskId", taskController.updateTask);
router.delete("/:taskId", taskController.deleteTask);

module.exports = router;
