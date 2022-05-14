import BaseError from "./error";

class DatabaseError extends BaseError {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}

export default DatabaseError;
