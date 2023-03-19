const { validationResult } = require('express-validator');
// Phase 5 | Handle validation errors
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => { // takes in any errors from validations
  const validationErrors = validationResult(req);
    // if there are errors
  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);
    // send errors to error-handling middleware
    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const handleValidationError = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error("Validation Error");
    err.errors = errors;
    err.status = 400;
    err.title = "Validation Error";
    next(err);
  }
  next();
};

const handleValidationErrorsForSpots = (req, _res, next) => { // takes in any errors from validations
  const validationErrors = validationResult(req);
    // if there are errors
  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);
    // send errors to error-handling middleware
    const err = Error("Bad request.");
    err.title = "Validation Error";
    err.message = "Validation Error";
    err.status = 400;
    err.errors = errors;
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors, handleValidationErrorsForSpots, handleValidationError
};
