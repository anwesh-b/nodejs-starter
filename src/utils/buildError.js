import HttpStatus from "http-status-codes";

import TokenError from "../errors/token";
import DatabaseError from "../errors/database";
import ForbiddenError from "../errors/forbidden";
import ValidationError from "../errors/validation";
import RowNotFoundError from "../errors/rowNotFound";

export default function (error) {
  if (error instanceof RowNotFoundError) {
    return {
      code: HttpStatus.NOT_FOUND,
      message: error.message,
    };
  }

  if (error instanceof ValidationError) {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: error.message,
    };
  }

  if (error instanceof ForbiddenError) {
    return {
      code: HttpStatus.FORBIDDEN,
      message: error.message,
    };
  }

  if (error instanceof DatabaseError) {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: error.message || "Something went wrong",
    };
  }

  if (error instanceof TokenError) {
    return {
      code: HttpStatus.UNAUTHORIZED,
      message: error.message || "Invalid token",
    };
  }

  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: error.message || "Something went wrong",
  };
}
