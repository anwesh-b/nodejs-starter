import db from "../db";

const resolver = () => db;

class BaseModel {
  static table;

  static getConnection() {
    return resolver();
  }

  static queryBuilder(trx) {
    if (!trx) {
      return this.getConnection();
    }

    return trx;
  }

  static transaction(callback, trx) {
    if (trx) {
      return callback(trx);
    }

    return this.getConnection().transaction(callback);
  }

  static insert(data, trx) {
    return this.queryBuilder(trx).insert(data).into(this.table).returning("*");
  }

  static update(data, trx) {
    return this.queryBuilder(trx).update(data).into(this.table);
  }

  static delete(id, trx) {
    return this.queryBuilder(trx).delete().from(this.table).where("id", id);
  }

  static findById(id, trx) {
    return this.queryBuilder(trx).select("*").from(this.table).where("id", id);
  }
}

export default BaseModel;
