import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({});
  }
  return next();
}

export default isAuthorized;