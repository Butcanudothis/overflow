"use server";

import { connectToDatabase } from "@/lib/mongoose";
import User from "@/database/user.model";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "@/lib/actions/shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

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

export async function createUser(userData: CreateUserParams) {
  // eslint-disable-next-line no-useless-catch
  try {
    connectToDatabase();
    return await User.create(userData);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateUser(params: UpdateUserParams) {
  // eslint-disable-next-line no-useless-catch
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  // eslint-disable-next-line no-useless-catch
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    //   delete all user activity

    // eslint-disable-next-line no-unused-vars
    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id",
    );

    await Question.deleteMany({ author: user._id });

    //   delete all user activity comments, answers, votes

    // noinspection UnnecessaryLocalVariableJS
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (err) {
    throw err;
  }
}
