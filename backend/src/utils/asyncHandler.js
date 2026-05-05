/**
 * Simple wrapper to catch errors in async routes
 * and pass them to our global error handler.
 * This lets us remove try/catch from every controller!
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
