import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
const publicPath = path.join(__dirname, "..", "public");

app.use(express.static(publicPath));

app.get(["/", "/index.html"], (req: Request, res: Response) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`SNT backend running on port ${port}`);
});
