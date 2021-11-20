import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { IUserDocument } from "../models/User.model";

export async function createUser(input: DocumentDefinition<IUserDocument>) {
  try {
    return await User.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findUser(query: FilterQuery<IUserDocument>) {
  return User.findOne(query);
}

export async function validatePassword({
  email,
  password
}: {
  email: IUserDocument["email"];
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
}