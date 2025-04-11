import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import authenticate from "./middlewares/authMiddlewares";

dotenv.config();
const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://quick-search-weld.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;

app.use("/api", authenticate, router);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});