import knexJs from "knex";
import toSnakeCase from "to-snake-case";
import camelcaseKeys from "camelcase-keys";

import knex from "./knex";

const dbConfig = {
  ...knex,
  pool: {
    min: 2,
    max: 6,
    createTimeoutMillis: 3000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false, // <- default is true, set to false
  },
  wrapIdentifier: (value, origImpl) => {
    if (value === "*") {
      return origImpl(value);
    }

    return origImpl(toSnakeCase(value));
  },
  postProcessResponse: (result) => {
    if (Array.isArray(result)) {
      if (result.length === 0 || !result[0] || typeof result[0] !== "object") {
        return result;
      } else {
        return camelcaseKeys(result, { deep: true });
      }
    }
  },
};

/**
 * Database connection.
 */
const wrappedDb = knexJs(dbConfig);

export default wrappedDb;
