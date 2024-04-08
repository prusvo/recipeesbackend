import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import bodyParser from "body-parser";
import path from "path"

import cookieParser from "cookie-parser";


import authRouter from "./routes/authRouter.js"
import RecPageRouter from "./routes/RecPageRouter.js"
const PORT = process.env.PORT || 5000
const API = 'mongodb+srv://admin:admin@cluster0.t1ju6q0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const app = express()
const __dirname = path.resolve()
const buildPath = path.join(__dirname, "../frontend/build")
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

app.use(cookieParser())






mongoose.connect(API)
    .then(() => {
        console.log('Connected to Mongo DB')
        app.use(express.json())
        app.use(bodyParser.json());
        app.use("/auth", authRouter)

        app.use("/recipe", RecPageRouter)
        app.use(express.static(path.join(buildPath)))
        // app.get("*", (req, res) =>{
        //     res.sendFile(path.join(__dirname, "..frontend/build/index.html"))
        //     const err = (err) => {
        //         if(err){
        //             res.status(500).send(err)
        //         }
        //     }
        // })
        

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })



