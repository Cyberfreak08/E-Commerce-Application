const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = process.env;
function auth(req, res, next) {
  const token = req?.header("x-auth-token")?.split(" ")[1];

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_TOKEN);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token is not valid" });
  }
}

module.exports = auth;
