"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/tasks", taskRoutes_1.default);
app.get("/", async (req, res) => {
    res.json({ message: "Home page" });
});
const mongoURL = process.env.MONGODB_URL || "";
if (!mongoURL) {
    console.error("Error: MONGO_URL is not defined in the .env file");
    process.exit(1);
}
(0, db_1.default)(mongoURL).catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
});
const PORT = parseInt(process.env.PORT || "3000", 10);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
