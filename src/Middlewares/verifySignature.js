import crypto from "crypto";

/*
 * Express middleware to verify HMAC SHA-256 signature
*/

export const verifySignatureMiddleware = (req, res, next) => {
  try {
    const signature = req.headers["yaya-signature"];
    const payload = req.body;

    if (!signature) {
      return res.status(401).json({ success: false, message: "Signature missing" });
    }

    const secret = process.env.WEBHOOK_SECRET;

    // Concatenate all payload values in order
    const signedPayload = Object.values(payload).join("");
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(signedPayload, "utf-8")
      .digest("hex");

    if (signature !== expectedSignature) {
      console.log("Invalid signature");
      return res.status(401).json({ success: false, message: "Invalid signature" });
    }

    // Signature valid => continue to next middleware or controller
    next();
  } catch (err) {
    console.error("Signature verification error:", err.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};