const dbTables = require("../constants/dbTables");
const tasks = require("../constants/tasks");

const TABLE_NAME = dbTables.TASK_STATUS;

/**
 * Create table `TABLE_NAME`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments("id").primary().unsigned().notNullable();
    table.integer("task_id").unsigned().notNullable();
    table.foreign("task_id").references("id").inTable(dbTables.TASKS);
    table.enum("status", [...tasks.TASK_STATUS]).notNullable();
    table.timestamp("created_at").notNull().defaultTo(knex.raw("now()"));
  });
}

/**
 * Drop TABLE_NAME.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(TABLE_NAME);
}
