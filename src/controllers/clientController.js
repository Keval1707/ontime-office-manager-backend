const db = require("../config/firebase");

const ClientController = {
  addClient: async (req, res) => {
    const userId = req.user.id;
    const clientData = req.body;
    const {
      name,
      companyName,
      phone,
      email,
      address,
      serviceRequired,
      notes,
      leadstatus,
      updateOnWhatsApp } = clientData;

    if (!name, !companyName, !phone, !email, !address, !serviceRequired, !notes, !leadstatus, !updateOnWhatsApp
    ) return res.status(400).json({ error: "All required fields must be filled" });

    const filteredData = Object.fromEntries(
      Object.entries(clientData).filter(([_, value]) => value !== undefined && value !== null && value !== "")
    );

    try {
      const clientRef = await db
        .collection("users")
        .doc(userId)
        .collection("clients")
        .add({
          ...filteredData,
          createdAt: new Date().toISOString(),
        });

      res.status(201).json({ id: clientRef.id, message: "Client added successfully" });
    } catch (err) {
      console.error("Add client error:", err);
      res.status(500).json({ error: "Failed to add client" });
    }
  },

  // Get all clients
  getClients: async (req, res) => {
    const userId = req.user.id;

    try {
      const snapshot = await db
        .collection("users")
        .doc(userId)
        .collection("clients")
        .get();

      const clients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.json(clients);
    } catch (err) {
      console.error("Get clients error:", err);
      res.status(500).json({ error: "Failed to fetch clients" });
    }
  },

  // Get client by ID
  getClientById: async (req, res) => {
    const userId = req.user.id;
    const clientId = req.params.clientId;

    try {
      const clientDoc = await db
        .collection("users")
        .doc(userId)
        .collection("clients")
        .doc(clientId)
        .get();

      if (!clientDoc.exists) {
        return res.status(404).json({ error: "Client not found" });
      }

      res.json({ id: clientDoc.id, ...clientDoc.data() });
    } catch (err) {
      console.error("Get client by ID error:", err);
      res.status(500).json({ error: "Failed to fetch client" });
    }
  },

  // Update client
  updateClient: async (req, res) => {
    const userId = req.user.id;
    const clientId = req.params.clientId;
    try {
      const clientRef = db.collection("users").doc(userId).collection("clients").doc(clientId);
      const doc = await clientRef.get();
      if (!doc.exists) return res.status(404).json({ error: "client not found" });

      await clientRef.update({ ...req.body, updatedAt: new Date().toISOString() });
      res.json({ message: "client updated successfully" });
    } catch (err) {
      console.error("Update client error:", err);
      res.status(500).json({ error: "Failed to update client" });
    }
  },

  // Delete client
  deleteClient: async (req, res) => {
    const userId = req.user.id;
    const clientId = req.params.clientId;

    try {
      await db
        .collection("users")
        .doc(userId)
        .collection("clients")
        .doc(clientId)
        .delete();
      res.json({ message: "Client deleted successfully" });
    } catch (err) {
      console.error("Delete client error:", err);
      res.status(500).json({ error: "Failed to delete client" });
    }
  },
};

module.exports = ClientController;
