/**
 * Middleware to enforce HTTPS
 * Rejects HTTP requests with 403 Forbidden
 */
export const httpsOnly = (req, res, next) => {
  if (!req.secure) {
    return res.status(403).send("HTTPS required");
  }
  next();
};