import BaseError from "./error";

class ValidationError extends BaseError {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export default ValidationError;
