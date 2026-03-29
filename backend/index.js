import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// init
console.log("🔥 INDEX.JS IS RUNNING");
dotenv.config();

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

app.use("/api/user", userRoutes);
app.use("/api/songs", songRoutes);

// __dirname setup (ESM safe)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// debug (optional)
console.log("DIR:", __dirname);
console.log("STATIC PATH:", path.join(__dirname, "../frontend/dist"));

// serve frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// catch-all (IMPORTANT - must be last)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// port
const port = process.env.PORT || 5000;

// start server
const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`🔥 SERVER RUNNING ON http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect DB:", error.message);
    process.exit(1);
  }
};

startServer();