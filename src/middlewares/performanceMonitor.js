export const performanceMonitor = (req, res, next) => {
  const start = Date.now(); // Get the start time

  res.on("finish", () => {
    const duration = Date.now() - start; // Calculate duration
    console.log(`Request to ${req.url} took ${duration}ms`);
  });

  next(); // Call the next middleware
};
