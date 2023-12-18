import React from "react";
import Link from "next/link";
import RenderTag from "@/components/shared/sidebar/RenderTag";
import Metric from "@/components/shared/Metric";
import { formatNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "@/components/shared/EditDeleteAction";

interface QuestionCardProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string;
}

const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionCardProps) => {
  const showActionButtons = clerkId === author.clerkId;
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="text-dark400_light700 subtle-regular line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {/*  if signed in add edit delete actions */}
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag _id={tag._id} key={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={`- asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyles="text-dark400_light700 body-medium"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value={`${formatNumber(upvotes.length)}`}
          title="Votes"
          textStyles="text-dark400_light700 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={`${formatNumber(answers.length)}`}
          title="Answers"
          textStyles="text-dark400_light700 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={`${formatNumber(views)}`}
          title="Views"
          textStyles="text-dark400_light700 small-medium"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
