import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import session from "express-session";
import Mongostore from "connect-mongo";
import transactionRouter from "./routes/transaction.route.js";
import cardRouter from "./routes/card.route.js";


const app = express();
dotenv.config();

// DB connection
connectDB();
const port = process.env.PORT || 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: Mongostore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60, 
    }),
    cookie: { secure: false,httpOnly:true }, 
  })
);

// Settings for server and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());



// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/user/transaction", transactionRouter);
app.use("/api/v1/user/card", cardRouter);

// Server listening
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
