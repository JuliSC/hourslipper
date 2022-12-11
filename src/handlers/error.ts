// error handler function
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // log error
  console.error(err);

  // send error response
  res.status(500).send({
    message: err.message,
  });
};
