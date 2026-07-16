import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";

const router: IRouter = Router();

// Service root — used by the deployment healthcheck probe.
router.get("/", (_req, res) => {
  res.json({ status: "ok", service: "api" });
});

router.use(healthRouter);
router.use(contactRouter);

export default router;
