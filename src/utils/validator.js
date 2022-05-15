import isEmpty from "lodash/isEmpty";

function validate(data, schema) {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (!isEmpty(error)) {
    return Promise.reject(error);
  }

  return Promise.resolve(value);
}

export function body(validator) {
  return (req, res, next) => {
    return validate(req.body, validator)
      .then(() => next())
      .catch(next);
  };
}

export function query(validator) {
  return (req, res, next) => {
    return validate(req.query, validator)
      .then(() => next())
      .catch(next);
  };
}
