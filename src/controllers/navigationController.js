const db = require("../config/firebase");
const { FieldPath } = require("firebase-admin").firestore;

const NavigationController = {
  addRouterLink: async (req, res) => {
    const {
      title,
      path,
      basePath,
      isActive,
      isProtected,
      iconKey,
      pageKey,
      show,
    } = req.body;

    console.log("Incoming RouterLink:", req.body);

    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!path) missingFields.push("path");
    if (!basePath) missingFields.push("basePath");
    if (typeof isActive !== "boolean") missingFields.push("isActive");
    if (typeof isProtected !== "boolean") missingFields.push("isProtected");
    if (!iconKey) missingFields.push("iconKey");
    if (!pageKey) missingFields.push("pageKey");
    if (typeof show !== "boolean") missingFields.push("show");

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing or invalid required fields",
        missingFields,
      });
    }

    try {
      const docRef = await db.collection("RouterLinks").add({
        title,
        path,
        basePath,
        isActive,
        isProtected,
        iconKey,
        pageKey,
        show,
        createdAt: new Date().toISOString(),
      });

      return res.status(201).json({
        id: docRef.id,
        message: "RouterLink added successfully",
      });
    } catch (err) {
      console.error("🔥 Add RouterLink error:", err);
      return res.status(500).json({ error: "Failed to add RouterLink" });
    }
  },

  addRouterGroup: async (req, res) => {
    const { groupTitle, navLinkItems } = req.body;
    console.log(groupTitle, navLinkItems);
    
    if (!groupTitle || !Array.isArray(navLinkItems)) {
      return res.status(400).json({ error: "Missing required fields: groupTitle or navLinkItems" });
    }

    try {
      const docRef = await db.collection("RouterGroups").add({
        groupTitle,
        navLinkItems,
        createdAt: new Date().toISOString()
      });

      res.status(201).json({ groupId: docRef.id, message: "Router group created successfully" });
    } catch (err) {
      console.error("Add RouterGroup error:", err);
      res.status(500).json({ error: "Failed to create router group" });
    }
  },

  getAllNavigation: async (req, res) => {
    console.log("hello form get all router ");
    
    try {
      const linksSnapshot = await db.collection("RouterLinks").get();
      const routerLinks = linksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const groupsSnapshot = await db.collection("RouterGroups").get();
      const routerGroups = [];

      for (const doc of groupsSnapshot.docs) {
        const groupData = doc.data();
        let navLinkItems = [];

        if (Array.isArray(groupData.navLinkItems) && groupData.navLinkItems.length > 0) {
          const linkIds = groupData.navLinkItems.slice(0, 10); // Firestore limit per query
          const batch = await db.collection("RouterLinks")
            .where(FieldPath.documentId(), "in", linkIds)
            .get();

          navLinkItems = batch.docs.map(linkDoc => ({
            id: linkDoc.id,
            ...linkDoc.data()
          }));
        }

        routerGroups.push({
          id: doc.id,
          groupTitle: groupData.groupTitle,
          navLinkItems   
        });
      }
      res.json({ routerLinks, routerGroups });
    } catch (err) {
      console.error("Get combined navigation error:", err);
      res.status(500).json({ error: "Failed to fetch navigation data" });
    }
  },

  getRouterLinkById: async (req, res) => {
    const id = req.params.id;

    try {
      const doc = await db.collection("RouterLinks").doc(id).get();
      if (!doc.exists) {
        return res.status(404).json({ error: "RouterLink not found" });
      }
      res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
      console.error("Get RouterLink by ID error:", err);
      res.status(500).json({ error: "Failed to fetch RouterLink" });
    }
  },

  getRouterGroupById: async (req, res) => {
    const groupId = req.params.id;

    try {
      const doc = await db.collection("RouterGroups").doc(groupId).get();
      if (!doc.exists) {
        return res.status(404).json({ error: "RouterGroup not found" });
      }

      res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
      console.error("Get RouterGroup by ID error:", err);
      res.status(500).json({ error: "Failed to fetch RouterGroup" });
    }
  },

  updateRouterLink: async (req, res) => {
    const id = req.params.id;

    try {
      const docRef = db.collection("RouterLinks").doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        return res.status(404).json({ error: "RouterLink not found" });
      }

      await docRef.update({
        ...req.body,
        updatedAt: new Date().toISOString()
      });

      res.json({ message: "RouterLink updated successfully" });
    } catch (err) {
      console.error("Update RouterLink error:", err);
      res.status(500).json({ error: "Failed to update RouterLink" });
    }
  },

  updateRouterGroup: async (req, res) => {
    const groupId = req.params.id;
    const updates = req.body;

    try {
      const docRef = db.collection("RouterGroups").doc(groupId);
      const doc = await docRef.get();

      if (!doc.exists) {
        return res.status(404).json({ error: "RouterGroup not found" });
      }

      await docRef.update({
        ...updates,
        updatedAt: new Date().toISOString()
      });

      res.json({ message: "RouterGroup updated successfully" });
    } catch (err) {
      console.error("Update RouterGroup error:", err);
      res.status(500).json({ error: "Failed to update RouterGroup" });
    }
  },

  deleteRouterLink: async (req, res) => {
    const id = req.params.id;

    try {
      await db.collection("RouterLinks").doc(id).delete();
      res.json({ message: "RouterLink deleted successfully" });
    } catch (err) {
      console.error("Delete RouterLink error:", err);
      res.status(500).json({ error: "Failed to delete RouterLink" });
    }
  },

  deleteRouterGroup: async (req, res) => {
    const groupId = req.params.id;

    try {
      await db.collection("RouterGroups").doc(groupId).delete();
      res.json({ message: "RouterGroup deleted successfully" });
    } catch (err) {
      console.error("Delete RouterGroup error:", err);
      res.status(500).json({ error: "Failed to delete RouterGroup" });
    }
  }
};

module.exports = NavigationController;
