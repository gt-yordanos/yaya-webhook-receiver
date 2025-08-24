import express from "express";
import { handleWebhook } from "../Controllers/webhookController.js";
import { verifySignatureMiddleware } from "../Middlewares/verifySignature.js";

const router = express.Router();

// Use signature middleware before processing the webhook
router.post("/", verifySignatureMiddleware, handleWebhook);

export default router;
