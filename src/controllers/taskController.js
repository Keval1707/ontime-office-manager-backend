const db = require("../config/firebase");

const taskController = {
  addTask: async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    console.log(data);

    const { title, description, deadline, priority, status } = data;

    if (!title || !description || !deadline || !priority || !status) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== "")
    );
    try {
      const taskRef = await db.collection("users").doc(userId).collection("tasks").add({
        ...filteredData,
        createdAt: new Date().toISOString(),
      });

      res.status(201).json({ id: taskRef.id, message: "Task added successfully" });
    } catch (err) {
      console.error("Add task error:", err);
      res.status(400).json({ error: err.message || "Failed to add task" });
    }
  },

  getAllTasks: async (req, res) => {
    const userId = req.user.id;
    try {
      const taskRef = await db.collection("users").doc(userId).collection("tasks").get();
      const tasks = taskRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.json(tasks);
    } catch (err) {
      console.error("Fetch tasks error:", err);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  },

  getTaskById: async (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    try {
      const doc = await db.collection("users").doc(userId).collection("tasks").doc(taskId).get();
      if (!doc.exists) return res.status(404).json({ error: "Task not found" });
      res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
      console.error("Fetch task error:", err);
      res.status(500).json({ error: "Failed to get task" });
    }
  },

  updateTask: async (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    try {
      const taskRef = db.collection("users").doc(userId).collection("tasks").doc(taskId);
      const doc = await taskRef.get();
      if (!doc.exists) return res.status(404).json({ error: "Task not found" });

      await taskRef.update({ ...req.body, updatedAt: new Date().toISOString() });
      res.json({ message: "Task updated successfully" });
    } catch (err) {
      console.error("Update task error:", err);
      res.status(500).json({ error: "Failed to update task" });
    }
  },

  deleteTask: async (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    try {
      const taskRef = db.collection("users").doc(userId).collection("tasks").doc(taskId);
      const doc = await taskRef.get();
      if (!doc.exists) return res.status(404).json({ error: "Task not found" });

      await taskRef.delete();
      res.json({ message: "Task deleted successfully" });
    } catch (err) {
      console.error("Delete task error:", err);
      res.status(500).json({ error: "Failed to delete task" });
    }
  },
};

module.exports = taskController;
