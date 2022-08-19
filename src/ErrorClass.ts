class ErrorClass extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational: Boolean = true,
    public stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ErrorClass;
