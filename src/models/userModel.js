// src/models/userModel.js
const db = require("../config/firebase");

const UserModel = {
  addUser: async (data) => {
    const userRef = await db.collection("users").add(data);
    return userRef.id;
  },

  getUserByEmail: async (email) => {
    const snapshot = await db.collection("users").where("email", "==", email).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  },
};

module.exports = UserModel;
