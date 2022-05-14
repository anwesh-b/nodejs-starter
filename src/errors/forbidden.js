import BaseError from "./error";

class ForbiddenError extends BaseError {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
  }
}

export default ForbiddenError;
