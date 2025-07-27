import { QUERY_KEYS } from "constants/query";

import React, { useEffect, useState } from "react";

import quizzesApi from "apis/quizzes";
import { useClearQueryClient } from "hooks/reactQuery/useClearQueryClient";
import { useQuizzesShow } from "hooks/reactQuery/useQuizzesApi";
import { useParams } from "react-router-dom";
import withTitle from "utils/withTitle";

import Body from "./Body";
import Header from "./Header";

const QuizPage = () => {
  const [title, setTitle] = useState("");
  const { slug } = useParams();

  const clearQueryClient = useClearQueryClient();

  const { data: { data: { quiz } = {} } = {} } = useQuizzesShow(slug);

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
    }
  }, [quiz]);

  const handleQuizUpdate = async ({ quiet = false, payload }) => {
    try {
      await quizzesApi.update({
        slugs: slug,
        quiet,
        payload,
      });
      clearQueryClient(QUERY_KEYS.QUIZZES);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleTitleUpdate = event => {
    setTitle(event.target.value);
  };

  const handleInputBlur = () => {
    if (title.trim() === "" || title.trim() === quiz.title) {
      setTitle(quiz.title);

      return;
    }

    handleQuizUpdate({
      quiet: true,
      payload: { title },
    });
  };

  const handlePublish = () => {
    handleQuizUpdate({
      quiet: true,
      payload: { isDraft: false, isPublished: true },
    });
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-[10%] w-full items-center border-b-2 border-gray-300">
        <Header
          {...{
            title,
            slug,
            originalTitle: quiz?.title,
            handleTitleUpdate,
            handleInputBlur,
            isDraft: quiz?.isDraft,
            updatedAt: quiz?.updated_at,
            handlePublish,
          }}
        />
      </div>
      <div className="h-[90%] w-full">
        <Body />
      </div>
    </div>
  );
};

export default withTitle(QuizPage, "Quiz Editor");
