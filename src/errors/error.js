class BaseError extends Error {
  constructor(message = "") {
    super(message);

    this.message = message;
    this.custom = true;
  }
}

export default BaseError;
