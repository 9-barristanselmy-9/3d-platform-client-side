import User from "@/models/user";
import mongoose from "mongoose";

export async function getUserFromDb(email: string) {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    const user = await User.findOne({ email }).select("+password");
    return user;
  } catch (error: unknown) {
    throw new Error("Error fetching user from database" + error);
  }
}
