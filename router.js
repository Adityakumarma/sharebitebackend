const express = require("express")
const { registerController, loginController } = require("./controller/usercontroller")
const jwtMiddleware = require("./middlewares/jwtMiddleware")
const { addDonationController, getAllDonationsController, getAvailableDonationsController, claimDonationController, getClaimedDonationsController, markasCompleteController } = require("./controller/foodcontroller")
const multerConfig = require("./middlewares/imgMulterMiddleware")
const ngoMiddleware = require("./middlewares/ngoMiddleware")
const adminMiddleware = require("./middlewares/adminMiddleware")
const { getAllUsersController, getAllDonationsAdminController, getAllNGOsController, deleteUserController, ngoVerificationController } = require("./controller/admincontroller")

const router = express.Router()

// register
router.post("/register",registerController)

// login
router.post("/login",loginController)

// add donation
router.post("/add-donations",jwtMiddleware,multerConfig.array("uploadImages",2),addDonationController)

// get all donations
router.get("/all-donations",jwtMiddleware,getAllDonationsController)

// get available donations
router.get("/available-donations",jwtMiddleware,ngoMiddleware,getAvailableDonationsController)

// claim donation
router.put("/claim-donation/:id",jwtMiddleware,ngoMiddleware,claimDonationController)

//get claimed Donations by Ngo
router.get("/claimed-donations",jwtMiddleware,ngoMiddleware,getClaimedDonationsController)

// mark as completed
router.put("/complete-donation/:id",jwtMiddleware,ngoMiddleware,markasCompleteController)

// get all users
router.get("/all-users", jwtMiddleware,adminMiddleware,  getAllUsersController)

// get all donations
router.get("/donations",  jwtMiddleware,adminMiddleware,  getAllDonationsAdminController)

// get all ngos
router.get("/all-ngos",jwtMiddleware,adminMiddleware,getAllNGOsController)

// delete a user
router.delete("/delete-user/:id",jwtMiddleware,adminMiddleware,deleteUserController)

// ngo verification
router.put("/ngo-verification/:id",jwtMiddleware,adminMiddleware,ngoVerificationController)

module.exports = router