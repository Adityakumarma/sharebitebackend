const jwt = require("jsonwebtoken")

const jwtMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json("Authorization header missing")
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json("Token missing")
    }

    const response = jwt.verify(token, process.env.secretkey)

    req.payload = response

    next()
  } catch (error) {
    return res.status(401).json("Invalid or expired token")
  }
}

module.exports = jwtMiddleware
