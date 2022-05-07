/**
 * Get all tasks.
 *
 * @param {Object} filter
 */
export async function getAll(filter) {
  return `Get all with filter ${JSON.stringify(filter)}`;
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
  return `Create task with data: ${JSON.stringify(task)}`;
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
