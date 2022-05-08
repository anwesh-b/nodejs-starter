const dbTables = require("../constants/dbTables");

const TABLE_NAME = dbTables.TASKS;

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
          title: "Write 10 pages essay",
          description: "I need to improve writing skills",
        },
        {
          id: 2,
          title: "Buy food for next month",
          description: "",
        },
        {
          id: 3,
          title: "Write email for the replacement of CCTV",
          description: "The CCTV is not working properly",
        },
        {
          id: 4,
          title: "Pay the tax of driving licence",
          description: "The last date of payment is on the 31st of March",
        }
      ]);
    });
}
