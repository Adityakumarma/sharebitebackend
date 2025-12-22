const mongoose = require("mongoose")

const donationSchema = new mongoose.Schema({
    foodtype: {
        type: String

    },
    quantity: {
        type: String

    },
    description: {
        type: String

    },
    pickuptime: {
        type: String

    },
    pickupaddress: {
        type: String
    },
    uploadImages: {
        type: Array,
        
    },
    userMail: {
        type: String,
        required: true
    },
    claimedBy: {
        type: String
    },
    status: {
        type: String,
        default: "available"
    }


})

const donations = mongoose.model("donations", donationSchema)
module.exports = donations