import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

const app = express();
dotenv.config();

connectDB();


const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Server is listen at port ${port}`);
})