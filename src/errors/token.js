import BaseError from "./error";

class TokenError extends BaseError {
  constructor(message) {
    super(message);
    this.name = "TokenError";
  }
}

export default TokenError;
