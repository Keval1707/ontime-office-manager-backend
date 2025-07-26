// src/config/firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("../../firebase-service-account.json"); // adjust path if needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
