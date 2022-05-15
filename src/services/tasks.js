import TasksModel from "../models/tasks";
import TaskStatusModel from "../models/tasksStatus";

import { BACKLOG } from "../constants/tasks";

import ValidationError from "../errors/validation";
import RowNotFoundError from "../errors/rowNotFound";

import { formatDate } from "../utils/date";
import { onlyWithAttrs } from "../utils/object";

/**
 * Get all tasks.
 *
 * @param {Object} filter
 */
export async function getAll(filter) {
  return await TasksModel.fetch(filter);
}

/**
 * Get task by id.
 *
 * @param {number} id
 * @returns
 */
export async function getById(id) {
  const [data] = await TasksModel.fetch({ id });

  if (!data) {
    throw new RowNotFoundError(`Task with id ${id} not found`);
  }

  return data;
}

/**
 * Create a new task.
 *
 * @param {Object} task
 * @returns
 */
export async function create(task) {
  return await TasksModel.transaction(async (trx) => {
    const fomattedTask = onlyWithAttrs(task, ["title", "description"]);

    const [newTask] = await TasksModel.insert(fomattedTask, trx);

    await TaskStatusModel.insert(
      { taskId: newTask.id, status: task.status },
      trx
    );

    return TasksModel.findById(newTask.id, trx);
  });
}

/**
 * Update task by id.
 *
 * @param {number} id
 * @param {Object} task
 * @returns
 */
export async function updateById(id, data, status) {
  const [prevData] = await TasksModel.fetch({ id });

  if (!prevData) {
    throw new RowNotFoundError(`Task with id ${id} not found`);
  }

  return await TasksModel.transaction(async (trx) => {
    const fomattedTask = onlyWithAttrs(data, ["title", "description"]);
    fomattedTask.updatedAt = formatDate();

    const [newTask] = await TasksModel.update(fomattedTask, trx);

    const currentStatus = await TasksModel.getCurrentStatus(id, trx);

    if (currentStatus !== status) {
      await TaskStatusModel.insert(
        { taskId: newTask.id, status: BACKLOG },
        trx
      );
    }

    return TasksModel.findById(newTask.id, trx);
  });
}

/**
 * Delete task by id.
 *
 * @param {number} id
 * @returns
 */
export async function deleteById(id) {
  await TaskStatusModel.transaction(async (trx) => {
    await TaskStatusModel.deleteByTaskId(id, trx);

    await TasksModel.deleteById(id, trx);
  });

  return { data: `Deleted task with id: ${id}` };
}

/**
 * Update task status.
 *
 * @param {number} id
 * @param {string} status
 * @returns
 */
export async function updateStatus(id, status) {
  return await TasksModel.transaction(async (trx) => {
    const [prevData] = await TasksModel.fetch({ id }, trx);

    if (!prevData) {
      throw new RowNotFoundError(`Task with id ${id} not found`);
    }

    if (prevData.status === status) {
      throw new ValidationError(`Task is already in ${status} status`);
    }

    await TaskStatusModel.insert({ taskId: id, status: status }, trx);

    return TasksModel.findById(newTask.id, trx);
  });
}
