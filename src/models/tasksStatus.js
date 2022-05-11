import GenericModel from "./generic";

import { TASK_STATUS } from "../constants/dbTables";

class TasksModel extends GenericModel {
  static table = TASK_STATUS;
}

export default TasksModel;
