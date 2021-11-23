import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createSession, findSessions, updateSession } from "../services/Session.service";
import { validatePassword } from "../services/User.service";
import { jwtSign } from "../utils/jwt.utils";

export async function createSessionHandler(req: Request, res: Response) {
  // validate user password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Invalid email or password"
    });
  }

  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  ip = ip.toString();

  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "", ip);

  // create an access token
  const accessToken = jwtSign(
    {...user, session: session._id},
    { expiresIn: process.env.JWT_EXPIRES }
  )
    
  // create a refresh token 
  const refreshToken = jwtSign(
    {...user, session: session._id},
    { expiresIn: process.env.JWT_REFRESH_EXPIRES }
  )

  res.status(StatusCodes.CREATED).json({
    accessToken,
    refreshToken,
    user,
  });
}

export async function getSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  res.status(StatusCodes.OK).json({
    sessions
  })
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = req.params?.id;

  await updateSession({ _id: sessionId }, { valid: false });

  res.status(StatusCodes.OK).json({
    success: true
  });
}