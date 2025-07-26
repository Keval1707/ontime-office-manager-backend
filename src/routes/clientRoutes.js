const express = require("express");
const router = express.Router();
const ClientController = require("../controllers/clientController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, ClientController.addClient);
router.get("/", authMiddleware, ClientController.getClients);
router.get("/:clientId", authMiddleware, ClientController.getClientById);
router.put("/:clientId", authMiddleware, ClientController.updateClient);
router.delete("/:clientId", authMiddleware, ClientController.deleteClient);


module.exports = router;
