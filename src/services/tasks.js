import TasksModel from "../models/tasks";
import TaskStatusModel from "../models/tasksStatus";

import { BACKLOG } from "../constants/tasks";

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
    const [newTask] = await TasksModel.insert(task, trx);

    await TaskStatusModel.insert({ taskId: newTask.id, status: BACKLOG }, trx);

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
export async function updateById(id, data, status, task) {
  return await TasksModel.transaction(async (trx) => {
    const [newTask] = await TasksModel.update(data, trx);

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
  await TasksModel.delete(id);

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
    const [newTask] = await TasksModel.update(data, trx);

    const currentStatus = await TasksModel.getCurrentStatus(id, trx);

    if (currentStatus === status) {
      throw new Error(`Task is already in ${status} status`);
    }

    await TaskStatusModel.insert({ taskId: newTask.id, status: BACKLOG }, trx);

    return TasksModel.findById(newTask.id, trx);
  });
}
