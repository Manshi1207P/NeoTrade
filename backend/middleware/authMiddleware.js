const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Protects a route: requires a valid "Authorization: Bearer <token>" header.
// On success, attaches the decoded user info to req.user.
function requireAuth(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided. Please log in." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, name, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
  }
}

module.exports = { requireAuth };
