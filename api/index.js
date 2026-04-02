const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

let db = null;
try {
  // On Vercel, we will use an Environment Variable for the JSON
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON 
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
    : require("./serviceAccountKey.json");

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  db = admin.firestore();
} catch(error) {
  console.error("Firebase Admin Error:", error.message);
}

// Health check
app.get("/api", (req, res) => {
  res.send("Diabetes Auth API (Vercel) is running");
});

// Auth Routes
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!db) return res.status(500).json({ error: "Database not connected" });
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();
    if(!snapshot.empty) return res.status(400).json({ error: "User already exists" });
    await usersRef.add({ name, email, password });
    res.json({ message: "Registration successful", user: { name, email } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!db) return res.status(500).json({ error: "Database not connected" });
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).where('password', '==', password).get();
    if(snapshot.empty) return res.status(401).json({ error: "Invalid credentials" });
    let user = null;
    snapshot.forEach(doc => { user = doc.data(); });
    res.json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
