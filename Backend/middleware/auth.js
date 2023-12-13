const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = process.env;
function auth(req, res, next) {
  const token = req?.header("x-auth-token")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token is not valid" });
  }
}

module.exports = auth;
