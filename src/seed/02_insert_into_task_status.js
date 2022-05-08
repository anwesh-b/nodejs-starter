const dbTables = require("../constants/dbTables");
const tasks = require("../constants/tasks");

const TABLE_NAME = dbTables.TASK_STATUS;

/**
 * Delete existing entries and seed values for `TABLE_NAME`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          id: 1,
          task_id: 1,
          status: tasks.BACKLOG,
        },
        {
          id: 2,
          task_id: 1,
          status: tasks.PROGRESS,
        },
        {
          id: 3,
          task_id: 1,
          status: tasks.COMPLETED,
        },
        {
          id: 4,
          task_id: 2,
          status: tasks.PROGRESS,
        },
        {
          id: 5,
          task_id: 3,
          status: tasks.BACKLOG,
        },
        {
          id: 6,
          task_id: 4,
          status: tasks.BACKLOG,
        },
        {
          id: 7,
          task_id: 4,
          status: tasks.PROGRESS,
        },
      ]);
    });
}
