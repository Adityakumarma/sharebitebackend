// 1. import express
const express = require("express")

// 7. import dotenv
require("dotenv").config()

// 5. import cors
const cors = require("cors")

// 8. import router
const router = require("./router")

// 11. import connection file
require("./connection")


// 2. create server
const SharebiteServer = express()

// 6. tell server to use cors
SharebiteServer.use(cors())

// 10. parse requests
SharebiteServer.use(express.json())

// 9. tell server to use router
SharebiteServer.use(router)

SharebiteServer.use("/imguploads",express.static("./imguploads"))


// 3. create a port
const PORT = 3000

// 4. Tell server to listen
SharebiteServer.listen(PORT,()=>{
    console.log(`Server running Successfully @ ${PORT}`);
    
})

