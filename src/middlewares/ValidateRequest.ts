import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import log from "../utils/logger";

const validateRequest = (scheme: AnySchema) => async (
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  try {
    await scheme.validate({
      body: req.body,
      query: req.query,
      params: req.params
    });
    return next();
  } catch (e) {
   log.error(e) 
   return res.status(StatusCodes.BAD_REQUEST).json({
     errors: e.errors
   });
  }
}

export default validateRequest;