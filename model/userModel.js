const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    license: {
        type : String,      
    },
    role: {
        type: String,
        default : "donor"
    },
    status: {
        type :String,
        default : "verified"
    }

})

const users = mongoose.model("users",userSchema)
module.exports = users 