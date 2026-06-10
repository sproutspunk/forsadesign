import rateLimit from "express-rate-limit";
import { SubmitContactResponse } from "@workspace/api-zod";
import { logger } from "../lib/logger";

// Per-IP throttle for the public contact endpoint. Keeps bots from flooding the
// business inbox while leaving plenty of headroom for genuine visitors (a real
// person rarely sends more than a handful of enquiries in a short window).
export const contactRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 5, // max submissions per IP per window
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn({ ip: req.ip }, "Contact form rate limit exceeded");
    res.status(429).json(
      SubmitContactResponse.parse({
        ok: false,
        error: "Too many requests. Please try again in a few minutes.",
      }),
    );
  },
});
