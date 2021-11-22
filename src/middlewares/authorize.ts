import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../services/Session.service";

const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // get access token
  const accessToken = req.headers?.authorization.replace(/^Bearer\s/, "");
  // get refresh token
  let refreshToken = req.headers["x-refresh"];

  if (!accessToken) return next();

  const { decoded, expired } = jwtVerify(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  refreshToken = refreshToken.toString();

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      const { decoded } = jwtVerify(newAccessToken);

      res.locals.user = decoded;
    }

    return next();
  }

  return next();
}

export default authorize;