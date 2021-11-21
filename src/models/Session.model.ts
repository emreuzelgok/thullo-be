import { IUserDocument } from "./User.model";
import { Schema, Document, model } from "mongoose";

export interface ISessionDocument extends  Document {
  user: IUserDocument["_id"];
  valid: boolean;
  userAgent: string;
  ip: string;
  updatedAt: Date;
  createdAt: Date;
}

const SessionSchema: Schema<ISessionDocument> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  valid: { type: Boolean, default: true },
  userAgent: { type: String },
  ip: { type: String }
}, {
  timestamps: true
})

const Session = model<ISessionDocument>('Session', SessionSchema);

export default Session;
