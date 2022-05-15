import Joi from "joi";

import * as tasks from "../constants/tasks";

const upsertTask = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().default(tasks.BACKLOG),
});

const updateStatus = Joi.object().keys({
  status: Joi.string()
    .valid(...tasks.TASK_STATUS)
    .required(),
});

export { upsertTask, updateStatus };
