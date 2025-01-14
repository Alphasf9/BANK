import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import transactionRouter from "./routes/transaction.route.js";
import cardRouter from "./routes/card.route.js";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const app = express();

connectDB();

const port = process.env.PORT || 3000;

app.use(morgan('dev')); 
app.use(cookieParser());  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/user/transaction", transactionRouter);
app.use("/api/v1/user/card", cardRouter);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
