import React from "react";

import { Column } from "neetoicons";
import { Dropdown, Checkbox } from "neetoui";
import { useTranslation } from "react-i18next";
import { useSubmissionTableActiveColumnsStore } from "stores/useSubmissionTableActiveColumnsStore";

const ColumnSelector = () => {
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

  const { t } = useTranslation();

  return (
    <Dropdown
      buttonStyle="text"
      closeOnSelect={false}
      icon={Column}
      strategy="fixed"
    >
      <div className="flex w-full flex-col items-center justify-start space-y-4 p-4">
        <Checkbox
          checked
          disabled
          className="w-full"
          label={t("labels.name")}
        />
        <Checkbox
          checked={showEmail}
          className="w-full"
          label={t("labels.email")}
          onClick={() => setShowEmail(!showEmail)}
        />
        <Checkbox
          checked={showSubmissionDate}
          className="w-full"
          label={t("labels.submissionDate")}
          onClick={() => setShowSubmissionDate(!showSubmissionDate)}
        />
        <Checkbox
          checked={showCorrectAnswers}
          className="w-full"
          label={t("labels.correctAnswers")}
          onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}
        />
        <Checkbox
          checked={showWrongAnswers}
          className="w-full"
          label={t("labels.wrongAnswers")}
          onClick={() => setShowWrongAnswers(!showWrongAnswers)}
        />
        <Checkbox
          checked={showUnanswered}
          className="w-full"
          label={t("labels.unanswered")}
          onClick={() => setShowUnanswered(!showUnanswered)}
        />
        <Checkbox
          checked={showQuestions}
          className="w-full"
          label={t("labels.questions")}
          onClick={() => setShowQuestions(!showQuestions)}
        />
        <Checkbox
          checked={showStatus}
          className="w-full"
          label={t("labels.status")}
          onClick={() => setShowStatus(!showStatus)}
        />
      </div>
    </Dropdown>
  );
};

export default ColumnSelector;
