"use server";

import { connectToDatabase } from "@/lib/mongoose";

export async function createQuestion(params: any) {
  // eslint-disable-next-line no-useless-catch
  try {
    connectToDatabase();
  } catch (err) {
    throw err;
  }
}
