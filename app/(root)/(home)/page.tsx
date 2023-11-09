import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Filters from "@/components/shared/search/Filters";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/Home/HomeFilters";
import NoResult from "@/components/shared/NoResult";

const questions = [
  {
    id: 1,
    title: "How to use React?",
    tags: [
      { _id: 1, name: "React" },
      { _id: 2, name: "JavaScript" },
    ],
    author: "John Doe",
    upvotes: 10,
    views: 100,
    answers: 5,
    createdAt: "2021-09-13T07:47:47.000Z",
  },
  {
    id: 2,
    title: "How to use styled-components?",
    tags: [
      { _id: 1, name: "React" },
      { _id: 2, name: "JavaScript" },
    ],
    author: "John Doe",
    upvotes: 10,
    views: 100,
    answers: 5,
    createdAt: "2021-09-13T07:47:47.000Z",
  },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 text-light-900 ">
            Ask Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search Questions..."
          otherClasses="flex-1"
        />
        <Filters
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => "question")
        ) : (
          <NoResult
            title="No results found"
            description="Be the first person to ask a question! 🚀 Kickstart the discussion."
            link="/ask-question"
            linkTitle="Ask Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
