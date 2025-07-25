import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config()

app.get("/", (req,res) => {
    res.send("oglannig bahali mulkdu")
})

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("ev is ok");
    app.listen(process.env.PORT || 5000, () => {
        console.log(`port running 5000`);
    })
})
.catch(error => {
    console.log(error.message);
    
})