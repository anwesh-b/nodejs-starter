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
  return `Get task with id: ${id}`;
}

/**
 * Create a new task.
 *
 * @param {Object} task
 * @returns
 */
export async function create(task) {
  try {
    return await TasksModel.transaction(async (trx) => {
      const [newTask] = await TasksModel.insert(task, trx);

      await TaskStatusModel.insert(
        { taskId: newTask.id, status: BACKLOG },
        trx
      );

      return TasksModel.findById(newTask.id, trx);
    });
  } catch (e) {
    throw e;
  }
}

/**
 * Update task by id.
 *
 * @param {number} id
 * @param {Object} task
 * @returns
 */
export async function updateById(id, task) {
  return `Update task with id: ${id} to ${JSON.stringify(task)}`;
}

/**
 * Delete task by id.
 *
 * @param {number} id
 * @returns
 */
export async function deleteById(id) {
  return `Delete task with id: ${id}`;
}
