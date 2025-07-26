import React from "react";

import EmptyState from "components/commons/EmptyState";
import { Button, Typography } from "neetoui";
import { isEmpty } from "ramda";
import withT from "utils/withT";

import Question from "./Question";

const Display = ({ questions, slug, isLoading, onAddClick, setIsDirty, t }) => {
  if (isLoading) {
    return <EmptyState title={t("quizzes.questions.loading")} />;
  }

  if (isEmpty(questions)) {
    return (
      <EmptyState
        primaryAction={onAddClick}
        primaryActionLabel={t("quizzes.questions.add")}
        title={t("quizzes.questions.emptyTitle")}
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col space-y-4 overflow-hidden bg-gray-100 p-12">
      <div className="flex justify-end">
        <Button label={t("quizzes.questions.add")} onClick={onAddClick} />
      </div>
      <div className="questions-list flex h-full w-full flex-col items-center overflow-y-auto">
        <Typography className="mb-2 w-3/4" style="h4">
          {questions?.length} questions
        </Typography>
        {questions &&
          questions.map(question => (
            <Question key={question.id} {...{ question, slug, setIsDirty }} />
          ))}
      </div>
    </div>
  );
};

export default withT(Display);
