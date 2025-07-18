import { QUERY_KEYS } from "constants/query";

import React, { useEffect, useState } from "react";

import quizzesApi from "apis/quizzes";
import { useClearQueryClient } from "hooks/reactQuery/useClearQueryClient";
import { useQuizzesShow } from "hooks/reactQuery/useQuizzesApi";
import { useParams } from "react-router-dom";

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

  const handleTitleUpdate = event => {
    setTitle(event.target.value);
  };

  const handleInputBlur = async () => {
    if (title.trim() === "" || title.trim() === quiz.title) {
      setTitle(quiz.title);

      return;
    }

    try {
      await quizzesApi.update(slug, { title, quiet: true });
      clearQueryClient(QUERY_KEYS.QUIZZES);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-[10%] w-full items-center border-b-2 border-gray-300">
        <Header
          {...{
            title,
            slug,
            handleTitleUpdate,
            handleInputBlur,
            isDraft: true,
            updatedAt: quiz?.updated_at,
            handlePublish: () => {},
            handlePreviewClick: () => {},
          }}
        />
      </div>
      <div className="h-[90%] w-full">
        <Body />
      </div>
    </div>
  );
};

export default QuizPage;
