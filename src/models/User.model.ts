import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Schema, Document, model } from "mongoose";

interface IUserBase {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IUserDocument extends IUserBase, Document {
  generateToken: (password: string) => Promise<string>;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema<IUserDocument> = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  bio: String,
}, {
  timestamps: true
})

UserSchema.pre<IUserDocument>('save', async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.generateToken = function(this: IUserDocument) {
  return jwt.sign({ _id: this.id }, process.env.ACCESS_TOKEN, {
    expiresIn: '15d'
  });
}

UserSchema.methods.comparePassword = async function(this: IUserDocument, password: string) {
  return await bcrypt.compare(password, this.password);
}

export default model<IUserDocument>('User', UserSchema);
