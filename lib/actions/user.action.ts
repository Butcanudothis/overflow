"use server";

import { connectToDatabase } from "@/lib/mongoose";
import User from "@/database/user.model";

export async function getUserById(params: any) {
  // eslint-disable-next-line no-useless-catch
  try {
    connectToDatabase();
    const { userId } = params;
    console.log(userId);
    return await User.findOne({ clerkId: userId });
  } catch (err) {
    throw err;
  }
}
