const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const ProjectController = require("../controllers/projectController");

router.use(authMiddleware);

router.post("/", ProjectController.addProject);
router.get("/", ProjectController.getProjects);
router.get("/:projectId", ProjectController.getProjectById);
router.put("/:projectId", ProjectController.updateProject);
router.delete("/:projectId", ProjectController.deleteProject);

module.exports = router;
