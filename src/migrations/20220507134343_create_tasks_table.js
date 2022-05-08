const dbTables = require("../constants/dbTables");

const TABLE_NAME = dbTables.TASKS;

/**
 * Create table `TABLE_NAME`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments("id").primary().unsigned().notNullable();
    table.string("title");
    table.string("description").notNullable();
    table.timestamp("created_at").notNull().defaultTo(knex.raw("now()"));
    table.timestamp("updated_at").notNull().defaultTo(knex.raw("now()"));
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
