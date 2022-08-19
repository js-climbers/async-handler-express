export { catchAsync } from './catchAsync';
export { errorHandler } from './handler';

export const asyncHandle = function (fn: Function) {
  Promise.resolve(fn(arguments)).catch(() => {
    return 'err';
  });
};
