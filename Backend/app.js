import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import session from "express-session";
import Mongostore from "connect-mongo";
import transactionRouter from "./routes/transaction.route.js";
import cardRouter from "./routes/card.route.js";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const app = express();


connectDB();

const port = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  credentials: true, 
};


app.use(morgan("dev")); 
app.use(cors(corsOptions)); 
app.options("*", cors(corsOptions));

app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: Mongostore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60, 
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "none",
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use((req, res, next) => {
  console.log(`\nIncoming Request:`);
  console.log(`Cookies: ${JSON.stringify(req.cookies)}`);
  console.log(`Session: ${JSON.stringify(req.session)}`);
  next();
});

app.get('/set-test-cookie', (req, res) => {
  req.session.testData = "Test Data Content";
  res.cookie('test-cookie', 'testValue', {
    httpOnly: true,
    sameSite: 'none',
    secure: true
  });
  res.status(200).json({ message: "Test Cookie Set" })
})


app.get('/check-test-cookie', (req, res) => {
  console.log("Session Data:", req.session.testData);
  console.log("Cookies:", req.cookies);
  res.status(200).json({ session: req.session, cookies: req.cookies });
})


app.use(express.static("public"));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/user/transaction", transactionRouter);
app.use("/api/v1/user/card", cardRouter);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
