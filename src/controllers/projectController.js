const db = require("../config/firebase");

const ProjectController = {
  addProject: async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    const { title, client, startDate, endDate, progress, status } = data
    if (!title, !client, !startDate, !endDate, !progress, !status) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== "")
    );
    try {
      const ref = await db.collection("users").doc(userId).collection("projects").add({
        ...filteredData,
        createdAt: new Date().toISOString(),
      });
      res.status(201).json({ id: ref.id, message: "Project added successfully" });
    } catch (err) {
      console.error("Add project error:", err);
      res.status(500).json({ error: "Failed to add project" });
    }
  },

  getProjects: async (req, res) => {
    const userId = req.user.id;
    try {
      const projectRef = await db.collection("users").doc(userId).collection("projects").get();
      const projects = projectRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.json(projects);
    } catch (err) {
      console.error("Fetch projects error:", err);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  },

  getProjectById: async (req, res) => {
    const userId = req.user.id;
    const { projectId } = req.params;
    try {
      const doc = await db.collection("users").doc(userId).collection("projects").doc(projectId).get();
      if (!doc.exists) return res.status(404).json({ error: "Project not found" });
      res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
      console.error("Fetch project error:", err);
      res.status(500).json({ error: "Error fetching project" });
    }
  },

  updateProject: async (req, res) => {
    const userId = req.user.id;
    const { projectId } = req.params;
    try {
      const projectRef = db.collection("users").doc(userId).collection("projects").doc(projectId);
      const doc = await projectRef.get();
      if (!doc.exists) return res.status(404).json({ error: "Project not found" });

      await projectRef.update({ ...req.body, updatedAt: new Date() });
      res.json({ message: "Project updated successfully" });
    } catch (err) {
      console.error("Update project error:", err);
      res.status(500).json({ error: "Failed to update project" });
    }
  },

  deleteProject: async (req, res) => {
    const userId = req.user.id;
    const { projectId } = req.params;
    try {
      const projectRef = db.collection("users").doc(userId).collection("projects").doc(projectId);
      const doc = await projectRef.get();
      if (!doc.exists) return res.status(404).json({ error: "Project not found" });

      await projectRef.delete();
      res.json({ message: "Project deleted successfully" });
    } catch (err) {
      console.error("Delete project error:", err);
      res.status(500).json({ error: "Failed to delete project" });
    }
  },
};

module.exports = ProjectController;
