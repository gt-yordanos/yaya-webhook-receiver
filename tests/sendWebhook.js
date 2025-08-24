import crypto from "crypto";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.WEBHOOK_SECRET;
const payload = {
  id: "1dd2854e-3a79-4548-ae36-97e4a18ebf81",
  amount: 100,
  currency: "ETB",
  created_at_time: 1673381836,
  timestamp: Math.floor(Date.now() / 1000),
  cause: "Testing",
  full_name: "Abebe Kebede",
  account_name: "abebekebede1",
  invoice_url: "https://yayawallet.com/en/invoice/xxxx"
};

// Generate signature
const signedPayload = Object.values(payload).join("");
const signature = crypto
  .createHmac("sha256", secret)
  .update(signedPayload, "utf-8")
  .digest("hex");

(async () => {
  try {
    const res = await axios.post("http://localhost:5000/webhook", payload, {
      headers: { "yaya-signature": signature }
    });
    console.log(res.data);
  } catch (err) {
    console.error(err.response.data);
  }
})();