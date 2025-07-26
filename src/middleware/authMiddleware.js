const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
const JWT_SECRET = process.env.JWT_SECRET || "fallback-dev-secret";

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user data to request
    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
