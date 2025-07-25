import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import UserRouter from "./routes/user.route.js"

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5009',
    credentials: true
}));
dotenv.config();


app.use("/users", UserRouter)

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("ev is ok");
    app.listen(process.env.PORT || 5009, () => {
        console.log(`port running 5009`);
    })
})
.catch(error => {
    console.log(error.message);
    
})