const mongoose = require("mongoose")

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Connected successfully");
    
}).catch(err=>{
    console.log(`MongoDB Connection failed due to ${err}`);
    
})