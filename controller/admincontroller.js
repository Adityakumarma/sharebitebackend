const donations = require("../model/foodModel")
const users = require("../model/userModel")

// get all users
exports.getAllUsersController = async (req, res) => {
  const usermail = req.payload.usermail
  try {
    const allUsers = await users.find({ email: { $ne: usermail } })
    res.status(200).json(allUsers)
  } catch (err) {
    res.status(500).json(err)
  }
}

// getall donations
exports.getAllDonationsAdminController = async (req, res) => {
  try {
    const allDonations = await donations.find()
    res.status(200).json(allDonations)
  } catch (err) {
    res.status(500).json(err)
  }
}

// get all NGOs
exports.getAllNGOsController = async (req, res) => {
  try {
    const ngos = await users.find({ role: "ngo" })
    res.status(200).json(ngos)
  } catch (err) {
    res.status(500).json(err)
  }
}

// delete a user
exports.deleteUserController = async (req, res) => {
  const { id } = req.params

  try {
    const User = await users.findByIdAndDelete(id)
    res.status(200).json(User)
  } catch (error) {
    res.status(500).json(error)
  }
}

// ngoverification
exports.ngoVerificationController = async (req, res) => {
  const { id } = req.params
  const { action } = req.body

  try {
    const ngo = await users.findById(id)
    if (action == "verify") {
      ngo.status = "verified"
    }
    else if (action == "reject") {
      ngo.status = "rejected"
    } else {
      res.status(400).json("Invalid Action")
    }
    await ngo.save()

    res.status(200).json(`NGO ${ngo.status} successfully!`)


  } catch (error) {
    res.status(500).json(error)
  }
}