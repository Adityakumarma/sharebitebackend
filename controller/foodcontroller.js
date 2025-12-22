const jwt = require("jsonwebtoken");
const donations = require("../model/foodModel");

// add food
exports.addDonationController = async (req, res) => {
    console.log("Inside addFood controller");
    const { foodtype, quantity, description, pickuptime, pickupaddress} = req.body

    var uploadImages = []
    req.files.map((item) => uploadImages.push(item.filename))

    const userMail = req.payload.usermail
    try {
        const newDonation = new donations({
            foodtype, quantity, description, pickuptime, pickupaddress, uploadImages, userMail, status: "available"
        })
        await newDonation.save()
        res.status(200).json(newDonation)

    } catch (error) {
        res.status(500).json(error)
    }

}

// get all donations

exports.getAllDonationsController = async (req, res) => {
  console.log("Inside getAllDonationsController");

  try {
    const allDonations = await donations.find()
    res.status(200).json(allDonations);
  } catch (error) {
    res.status(500).json(error);
  }
};


// -----------ngo------------------
// get all available donations
exports.getAvailableDonationsController = async (req, res) => {
  try {
    const donation = await donations.find({ status: "available" })
    res.status(200).json(donation)
  } catch (error) {
    res.status(500).json(error)
  }
}

// claim donation
exports.claimDonationController = async (req, res) => {
  const { id } = req.params
  const ngoMail = req.payload.usermail

  try {
    const donation = await donations.findById(id)

    if (!donation || donation.status !== "available") {
      return res.status(400).json("Donation not available")
    }

    donation.status = "claimed"
    donation.claimedBy = ngoMail
    await donation.save()

    res.status(200).json("Donation claimed successfully")
  } catch (error) {
    res.status(500).json(error)
  }
}

// get claimed Donations by Ngo
exports.getClaimedDonationsController = async (req, res) => {
  const ngoMail = req.payload.usermail

  try {
    const donation = await donations.find({ claimedBy: ngoMail })
    res.status(200).json(donation)
  } catch (error) {
    res.status(500).json(error)
  }
}

// mark as completed
exports.markasCompleteController = async (req, res) => {
  const { id } = req.params
  const ngoMail = req.payload.usermail

  try {
    const donation = await donations.findById(id)

    if (!donation || donation.claimedBy !== ngoMail) {
      return res.status(403).json("Not authorized")
    }

    donation.status = "completed"
    await donation.save()

    res.status(200).json("Donation marked as completed")
  } catch (error) {
    res.status(500).json(error)
  }
}