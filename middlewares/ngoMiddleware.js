const users = require("../model/userModel")

const ngoMiddleware = async (req, res, next) => {
  try {
    
    const email = req.payload.usermail

    const user = await users.findOne({ email })

    if (!user) {
      return res.status(404).json("User not found")
    }

    
    if (user.role !== "ngo") {
      return res.status(403).json("Access denied")
    }

  
    if (user.status !== "verified") {
      return res.status(405).json("NGO verification pending")
    }

    next()
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = ngoMiddleware
