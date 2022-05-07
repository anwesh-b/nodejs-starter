import { Router } from "express";
import path from "path";

import taskRoutes from "./routes/tasks";

const router = Router();

// Public Routes
router.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "public/docs.html"));
});

// router.use(authenticationMiddlware)

// Private Routes
router.use("/tasks", taskRoutes);

export default router;
