import GenericModel from "./generic";

import { TASK_STATUS } from "../constants/dbTables";

class TasksModel extends GenericModel {
  static table = TASK_STATUS;

  static deleteByTaskId(taskId, trx) {
    return this.queryBuilder(trx)
      .delete()
      .from(this.table)
      .where("taskId", taskId);
  }
}

export default TasksModel;
