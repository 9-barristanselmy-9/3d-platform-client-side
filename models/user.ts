import { IUser } from "../types/user";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema<IUser>({
  _id: { type: Schema.Types.ObjectId },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  emailVerified: { type: Date, default: null },
});

const User = models.User || model<IUser>("User", UserSchema);
export default User;
