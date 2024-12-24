import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";

const app = express();
dotenv.config();


//connection of DB
connectDB();
const port = process.env.PORT || 3000;

// Settins for server and cookies
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());


// Routes
app.use("/api/v1/user", userRouter)

// Server listining
app.listen(port, ()=> {
    console.log(`Server is listen at port ${port}`);
})