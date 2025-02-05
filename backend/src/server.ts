import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db"; 
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes"
import taskRoutes from "./routes/taskRoutes"



dotenv.config();

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Home page" }); 
});


const mongoURL: string = process.env.MONGODB_URL || "";

if (!mongoURL) {
  console.error("Error: MONGO_URL is not defined in the .env file");
  process.exit(1); 
}


connectDB(mongoURL).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1); 
});


const PORT: number = parseInt(process.env.PORT || "3000", 10); 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
