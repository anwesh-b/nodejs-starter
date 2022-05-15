import { Router } from "express";

import * as taskController from "../controllers/tasks";

import * as validate from "../utils/validator";
import { upsertTask, updateStatus } from "../schema/tasks";

const router = Router();

router.get("/", taskController.getAll);

router.get("/:id", taskController.getById);

router.post("/", validate.body(upsertTask), taskController.create);

router.put("/:id", validate.body(upsertTask), taskController.updateById);

router.delete("/:id", taskController.deleteById);

router.patch(
  "/:id/status",
  validate.body(updateStatus),
  taskController.updateStatus
);

export default router;
