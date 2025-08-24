import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import webhookRoutes from "./Routes/webhook.js";
// import { httpsOnly } from "./Middlewares/httpsOnly.js";

dotenv.config();
const app = express();

// Enforce HTTPS middleware  - Commented Out for test on localhost
// app.use(httpsOnly);

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // for application/json

// Routes
app.use("/webhook", webhookRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("YaYa Wallet Webhook Receiver is running");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));