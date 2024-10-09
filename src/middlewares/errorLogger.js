export const errorLogger = (err, req, res, next) => {
  console.error("Error:", err.message);
  next(err); // Call the next error handling middleware
};
