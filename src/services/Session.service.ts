import { LeanDocument, FilterQuery, UpdateQuery } from "mongoose";
import { IUserDocument } from "../models/User.model";
import Session, { ISessionDocument } from "../models/Session.model";
import { jwtSign, jwtVerify } from "../utils/jwt.utils";
import { findUser } from "./User.service";

export async function createSession(
  userId: string,
  userAgent: string,
  ip: string
) {
  const session = await Session.create({ user: userId, userAgent, ip });
  return session;
}

export function createAccessToken({
  user,
  session,
}: {
  user: Omit<IUserDocument, "password">,
  session: ISessionDocument
}) {
  const accessToken = jwtSign(
    { ...user, session: session._id },
    { expiresIn: process.env.JWT_EXPIRES  }
  );

  return accessToken;
}

export async function reIssueAccessToken({
  refreshToken
}: {
  refreshToken: string;
}) {
  const { decoded } = jwtVerify(refreshToken);

  if (!decoded || !decoded._id) return false;
  
  const session = await Session.findById(decoded._id);

  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}

export async function updateSession(
  query: FilterQuery<ISessionDocument>,
  update: UpdateQuery<ISessionDocument>,
) {
  return Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<ISessionDocument>) {
  return Session.find(query).lean();
}

