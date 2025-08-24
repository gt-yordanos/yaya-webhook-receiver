import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middleware to parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("YaYa Wallet Webhook Receiver is running");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));