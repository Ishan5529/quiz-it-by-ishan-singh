import React from "react";

import { Column } from "neetoicons";
import { Dropdown, Checkbox } from "neetoui";
import { useSubmissionTableActiveColumnsStore } from "stores/useSubmissionTableActiveColumnsStore";

const ColumnSelector = ({ setSelectedAttemptIds }) => {
  const {
    showEmail,
    showSubmissionDate,
    showCorrectAnswers,
    showWrongAnswers,
    showUnanswered,
    showQuestions,
    showStatus,
    setShowEmail,
    setShowSubmissionDate,
    setShowCorrectAnswers,
    setShowWrongAnswers,
    setShowUnanswered,
    setShowQuestions,
    setShowStatus,
  } = useSubmissionTableActiveColumnsStore();

  return (
    <Dropdown
      buttonStyle="text"
      closeOnSelect={false}
      icon={Column}
      strategy="fixed"
      onClick={() => setSelectedAttemptIds([])}
    >
      <div className="flex w-full flex-col items-center justify-start space-y-4 p-4">
        <Checkbox checked disabled className="w-full" label="Name" />
        <Checkbox
          checked={showEmail}
          className="w-full"
          label="Email"
          onChange={({ target: { checked } }) => setShowEmail(checked)}
        />
        <Checkbox
          checked={showSubmissionDate}
          className="w-full"
          label="Submission Date"
          onChange={({ target: { checked } }) => setShowSubmissionDate(checked)}
        />
        <Checkbox
          checked={showCorrectAnswers}
          className="w-full"
          label="Correct Answers"
          onChange={({ target: { checked } }) => setShowCorrectAnswers(checked)}
        />
        <Checkbox
          checked={showWrongAnswers}
          className="w-full"
          label="Wrong Answers"
          onChange={({ target: { checked } }) => setShowWrongAnswers(checked)}
        />
        <Checkbox
          checked={showUnanswered}
          className="w-full"
          label="Unanswered"
          onChange={({ target: { checked } }) => setShowUnanswered(checked)}
        />
        <Checkbox
          checked={showQuestions}
          className="w-full"
          label="Questions"
          onChange={({ target: { checked } }) => setShowQuestions(checked)}
        />
        <Checkbox
          checked={showStatus}
          className="w-full"
          label="Status"
          onChange={({ target: { checked } }) => setShowStatus(checked)}
        />
      </div>
    </Dropdown>
  );
};

export default ColumnSelector;
