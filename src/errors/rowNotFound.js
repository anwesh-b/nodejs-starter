import BaseError from "./error";

class RowNotFoundError extends BaseError {
  constructor(message) {
    super(message);
    this.name = "RowNotFoundError";
  }
}

export default RowNotFoundError;
