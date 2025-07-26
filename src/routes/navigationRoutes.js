const express = require("express");
const router = express.Router();
const navigationController = require("../controllers/navigationController");

// ✅ Router Links
router.post("/links", navigationController.addRouterLink);
router.get("/links/:id", navigationController.getRouterLinkById);
router.put("/links/:id", navigationController.updateRouterLink);
router.delete("/links/:id", navigationController.deleteRouterLink);

// ✅ Router Groups
router.post("/groups", navigationController.addRouterGroup);
router.get("/groups/:id", navigationController.getRouterGroupById);
router.put("/groups/:id", navigationController.updateRouterGroup);
router.delete("/groups/:id", navigationController.deleteRouterGroup);

// ✅ Combined Navigation
router.get("/", navigationController.getAllNavigation);

module.exports = router;
