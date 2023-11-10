import React from "react";
import Link from "next/link";
import Image from "next/image";
import RenderTag from "@/components/shared/sidebar/RenderTag";

const RightSidebar = () => {
  const hotQuestions = [
    {
      _id: "1",
      title:
        "What is the difference between a function expression vs declaration in JavaScript?",
    },
    {
      _id: "2",
      title:
        "What is the difference between a function expression vs declaration in JavaScript?",
    },
    {
      _id: "3",
      title:
        "What is the difference between a function expression vs declaration in JavaScript?",
    },
    {
      _id: "4",
      title:
        "What is the difference between a function expression vs declaration in JavaScript?",
    },
  ];

  const popularTags = [
    { _id: "1", name: "javascript", totalQuestions: 100 },
    { _id: "2", name: "react", totalQuestions: 100 },
    { _id: "3", name: "nodejs", totalQuestions: 100 },
    { _id: "4", name: "nextjs", totalQuestions: 100 },
    { _id: "5", name: "typescript", totalQuestions: 100 },
    { _id: "6", name: "mongodb", totalQuestions: 100 },
  ];
  return (
    <div
      className="custom-scrollbar background-light900_dark200 light-border sticky right-0  top-0 flex  h-screen w-[350px]
     flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden"
    >
      <div className="flex flex-1 flex-col gap-6">
        <div>
          <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
          <div className="mt-7 flex w-full flex-col gap-[30px]">
            {hotQuestions.map((item) => (
              <Link
                href={`/questions/${item._id}`}
                key={item._id}
                className=" flex items-center justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">
                  {item.title}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-16">
          <div className="h3-bold text-dark200_light900">Popular Tags</div>
          <div className="mt-7 flex flex-col gap-4">
            {popularTags.map((item) => (
              <RenderTag
                key={item._id}
                _id={item._id}
                name={item.name}
                totalQuestions={item.totalQuestions}
                showCount={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
