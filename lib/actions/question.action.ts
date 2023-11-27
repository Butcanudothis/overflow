"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { GetQuestionsParams } from "@/lib/actions/shared.types";
import { ZodString } from "zod";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();
    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({ path: "author", model: "User" });
    return { questions };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function createQuestion(params: {
  author: any;
  title: string;
  content: string;
  tags: ZodString["_output"][];
}) {
  // eslint-disable-next-line no-useless-catch
  try {
    connectToDatabase();
    const { title, content, tags, author } = params;
    // const { title, content, tags, author, path } = params;
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true },
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: {
        tags: { $each: tagDocuments },
      },
    });
  } catch (err) {
    throw err;
  }
}
