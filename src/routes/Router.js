const express = require("express");
const router = express.Router();

const userRouter = require('./userRoutes');
const clientRouter = require("./clientRoutes");
const projectRoutes = require("./projectRoutes");
const taskRouters= require("./taskRouters")
const navigationRoutes = require("./navigationRoutes");

router.use("/user", userRouter);
router.use("/clients", clientRouter);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRouters); 
router.use("/navigation", navigationRoutes); 

module.exports = router;
