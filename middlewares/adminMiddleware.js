const jwt = require("jsonwebtoken")

const adminMiddleware = (req, res, next) => {
  if (req.payload.role !== "admin") {
    return res.status(403).json("Admin access only")
  }
  next()
}

module.exports = adminMiddleware