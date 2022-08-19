import Express from 'express';
import httpStatus from 'http-status';
import ApiError from './ErrorClass';



export const errorHandler = (
  err: any,
  _req: Express.Request,
  res: Express.Response,
  _next: Express.NextFunction
) => {

  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.BAD_REQUEST;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    error.message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = error.message;

  const response = {
    code: error.statusCode,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  res.status(error.statusCode).send(response);
};
