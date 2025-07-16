import React from "react";

// import questionsApi from "apis/questions";
import EmptyState from "components/commons/EmptyState";
import { useQuestionsFetch } from "hooks/reactQuery/useQuestionsApi";
import { Button } from "neetoui";
import { isEmpty } from "ramda";
import { useParams, useHistory } from "react-router-dom";

import Question from "./Question";

const Questions = () => {
  const history = useHistory();
  const { slug } = useParams();

  const { data: { data: { questions } = {} } = {}, isLoading } =
    useQuestionsFetch(slug);

  const handleQuestionAddClick = () => {
    history.push(`/dashboard/quizzes/${slug}/add-question`);
  };

  if (isLoading) {
    return <EmptyState title="Loading questions" />;
  }

  if (isEmpty(questions)) {
    return (
      <EmptyState
        primaryAction={handleQuestionAddClick}
        primaryActionLabel="Add new question"
        title="There are no questions to show."
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col space-y-4 overflow-hidden bg-gray-100 p-12">
      <div className="flex justify-end">
        <Button label="Add new question" onClick={handleQuestionAddClick} />
      </div>
      <div className="questions-list flex h-full w-full flex-col items-center overflow-y-auto">
        <h4 className="mb-2 w-3/4">{questions?.length} questions</h4>
        {questions &&
          questions.map(question => (
            <Question key={question.id} {...{ question }} />
          ))}
      </div>
    </div>
  );
};

export default Questions;
