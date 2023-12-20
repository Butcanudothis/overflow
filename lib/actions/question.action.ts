"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "@/lib/actions/shared.types";
import { revalidatePath } from "next/cache";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import { FilterQuery } from "mongoose";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter } = params;
    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];
    }

    let sortOptions = {};
    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;

      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    // fetch recommended questions
    const questions = await Question.find(query)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({ path: "author", model: User })
      .sort(sortOptions);
    console.log(questions);
    return { questions };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  // eslint-disable-next-line no-useless-catch
  try {
    connectToDatabase();
    const { title, content, tags, author, path } = params;
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
    revalidatePath(path);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();
    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name" + " picture",
      });
    return question;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    // Update Query to pass
    let updateQuery = {};

    // if already upvoted ---> remove from upvotes
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    }
    // if downvoted ---> remove from downvotes and add to upvote
    else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    }
    // If did not do anything yet---> just add to upvotes
    else {
      updateQuery = {
        $addToSet: { upvotes: userId },
      };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    // Increment author's reputation by +10 for upvoting a question
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -1 : 1 },
    });

    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasupVoted ? -10 : 10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

// Down Vote Question
export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    await connectToDatabase();

    const { userId, questionId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { downvotes: userId },
      };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -2 : 2 },
    });
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasupVoted ? -10 : 10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

// Delete Question
export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    connectToDatabase();
    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } },
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    connectToDatabase();
    const { questionId, title, content, path } = params;

    const question = await Question.findById(questionId).populate("tags");

    if (!question) {
      throw new Error("Question not found");
    }

    question.title = title;
    question.content = content;
    await question.save();
    revalidatePath(path);
  } catch (error) {}
}

export async function getHotQuestions() {
  try {
    connectToDatabase();
    // Get All questions sorted by upvotes and limit by 6

    const hotQuestions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5);
    return hotQuestions;
  } catch (error) {
    console.log(error);
  }
}

//
// export async function getRecommendedQuestions(params: RecommendedParams) {
//   try {
//     await connectToDatabase();
//
//     const { userId, page = 1, pageSize = 20, searchQuery } = params;
//
//     // find user
//     const user = await User.findOne({ clerkId: userId });
//
//     if (!user) {
//       throw new Error("user not found");
//     }
//
//     const skipAmount = (page - 1) * pageSize;
//
//     // Find the user's interactions
//     const userInteractions = await Interaction.find({ user: user._id })
//       .populate("tags")
//       .exec();
//
//     // Extract tags from user's interactions
//     const userTags = userInteractions.reduce((tags, interaction) => {
//       if (interaction.tags) {
//         tags = tags.concat(interaction.tags);
//       }
//       return tags;
//     }, []);
//
//     // Get distinct tag IDs from user's interactions
//     const distinctUserTagIds = [
//       // @ts-ignore
//       ...new Set(userTags.map((tag: any) => tag._id)),
//     ];
//
//     const query: FilterQuery<typeof Question> = {
//       $and: [
//         { tags: { $in: distinctUserTagIds } }, // Questions with user's tags
//         { author: { $ne: user._id } }, // Exclude user's own questions
//       ],
//     };
//
//     if (searchQuery) {
//       query.$or = [
//         { title: { $regex: searchQuery, $options: "i" } },
//         { content: { $regex: searchQuery, $options: "i" } },
//       ];
//     }
//
//     const totalQuestions = await Question.countDocuments(query);
//
//     const recommendedQuestions = await Question.find(query)
//       .populate({
//         path: "tags",
//         model: Tag,
//       })
//       .populate({
//         path: "author",
//         model: User,
//       })
//       .skip(skipAmount)
//       .limit(pageSize);
//
//     const isNext = totalQuestions > skipAmount + recommendedQuestions.length;
//
//     return { questions: recommendedQuestions, isNext };
//   } catch (error) {
//     console.error("Error getting recommended questions:", error);
//     throw error;
//   }
// }
