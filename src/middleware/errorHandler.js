import buildError from "../utils/buildError";

export function errorHandler(err, req, res, next) {
  const error = buildError(err);

  res.status(error.code).json(error);
}
