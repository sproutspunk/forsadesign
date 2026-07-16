import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Requests reach this server through the Replit proxy, so the real client IP is
// in the X-Forwarded-For header. Trust the first hop so per-IP rate limiting
// keys on the actual visitor rather than the proxy address.
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Deployment healthcheck probe hits /api (no trailing slash).
app.get("/api", (_req, res) => {
  res.json({ status: "ok", service: "api" });
});

app.use("/api", router);

export default app;
