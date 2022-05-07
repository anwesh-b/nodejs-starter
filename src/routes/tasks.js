import { Router } from "express";

import * as taskController from "../controllers/tasks";

const router = Router();

router.get("/", taskController.getAll);

router.get("/:id", taskController.getById);

router.post("/", taskController.create);

router.put("/:id", taskController.updateById);

router.delete("/:id", taskController.deleteById);

export default router;
