import GenericModel from "./generic";

import { TASKS, TASK_STATUS } from "../constants/dbTables";

class TasksModel extends GenericModel {
  static table = TASKS;

  static baseQuery(trx) {
    return super
      .queryBuilder(trx)
      .select(`${this.table}.*`, `ts.status as status`)
      .from(this.table).joinRaw(`
        LEFT JOIN ${TASK_STATUS} as ts
          ON ts.task_id = ${this.table}.id  
          AND ts.id = (
            SELECT max(ts2.id) from ${TASK_STATUS} as ts2 WHERE ts2.task_id = ${this.table}.id
          )
      `);
  }

  static injectFilters(query, filter) {
    if (filter.id) {
      query.where(`${this.table}.id`, filter.id);
    }
  }

  static fetch(filter, trx) {
    const query = this.baseQuery(trx);

    this.injectFilters(query, filter);

    return query;
  }
}

export default TasksModel;
