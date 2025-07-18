import React from "react";

import EmptyState from "components/commons/EmptyState";
import { Button } from "neetoui";
import { isEmpty } from "ramda";

import Question from "./Question";

const Display = ({ questions, slug, isLoading, onAddClick, setIsDirty }) => {
  if (isLoading) {
    return <EmptyState title="Loading questions" />;
  }

  if (isEmpty(questions)) {
    return (
      <EmptyState
        primaryAction={onAddClick}
        primaryActionLabel="Add new question"
        title="There are no questions to show."
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col space-y-4 overflow-hidden bg-gray-100 p-12">
      <div className="flex justify-end">
        <Button label="Add new question" onClick={onAddClick} />
      </div>
      <div className="questions-list flex h-full w-full flex-col items-center overflow-y-auto">
        <h4 className="mb-2 w-3/4">{questions?.length} questions</h4>
        {questions &&
          questions.map(question => (
            <Question key={question.id} {...{ question, slug, setIsDirty }} />
          ))}
      </div>
    </div>
  );
};

export default Display;
