import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  image?: string;
  emailVerified?: Date | null;
}
