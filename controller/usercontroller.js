const users = require("../model/userModel");
const jwt = require("jsonwebtoken")


// register
exports.registerController = async (req, res) => {
    console.log("Inside reg controller");
    const { name, contact, email, password, address, license, role, status } = req.body
    // console.log(name, contact, email, password, address, license);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(400).json("User Already Exists, please Login")
        } else if (role == "donor") {
            const newUser = new users({
                name,
                contact,
                email,
                password,
                role,
                status
            })
            await newUser.save()
            res.status(200).json(newUser)
        } else if (role == "ngo") {
            const newUser = new users({
                name,
                contact,
                email,
                password,
                license,
                address,
                role,
                status: "pending"
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(500).json(error)


    }

}

// login
exports.loginController = async (req, res) => {
    console.log("Inside login controller");
    const { email, password } = req.body
    // console.log(name, contact, email, password, address, license);

    try {
        const existingUser = await users.findOne({ email })
        if (!existingUser) {
            res.status(400).json("User Not Found, Please Register")
        }
        if (existingUser.password != password) {
            res.status(401).json("Invalid Credentials")
        }
        if (existingUser.status == "rejected") {
            res.status(404).json("Admin verification Unsuccessfull")
        }
        if (existingUser.role == "ngo" && existingUser.status != "verified") {
            res.status(402).json("User not verified Yet, Wait for Admin verification")
        }

        const token = jwt.sign({ usermail: existingUser.email, role: existingUser.role }, process.env.secretkey)
        res.status(200).json({ existingUser, token })

    } catch (error) {
        res.status(500).json(error)
    }


}


