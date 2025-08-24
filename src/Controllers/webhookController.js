import { processedEvents } from "../database.js";

export const handleWebhook = (req, res) => {
  try {
    const payload = req.body;

    // 1. Prevent replay attacks (Event will be recieved only within 5 minutes of emission)
    const timestamp = payload.timestamp;
    const now = Math.floor(Date.now() / 1000);
    const FIVE_MINUTES = 5 * 60;

    if (Math.abs(now - timestamp) > FIVE_MINUTES) {
      console.log("Payload too old");
      return res.status(400).json({ success: false, message: "Event expired" });
    }

    // 2. Prevent duplicate processing
    const eventId = payload.id;
    if (processedEvents.has(eventId)) {
      console.log("Duplicate event ignored");
      return res.status(200).json({ success: true, message: "Event already processed" });
    }

    // 3. Process webhook (for now, just log)
    processedEvents.add(eventId);
    console.log("New Webhook Event Received:");
    console.log(payload);

    // 4. Quick response before heavy logic
    return res.status(200).json({ success: true, message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
