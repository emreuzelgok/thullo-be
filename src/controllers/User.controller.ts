import { Request, Response } from "express";
import { createUser, findUser } from "../services/User.service";
import { StatusCodes } from "http-status-codes";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const isRegistered = await findUser({ email: req.body?.email });
    if (isRegistered) { 
      return res.status(StatusCodes.CONFLICT).json({
        message: 'E-mail already in use.'
      })
    }
    const user = await createUser(req.body);
    const userObject = user.toObject();
    delete userObject.password;
    return res.status(StatusCodes.CREATED).json({
      user: userObject
    })
  } catch (e) {
    log.error(e.message);
    res.status(StatusCodes.BAD_REQUEST);
  }
}