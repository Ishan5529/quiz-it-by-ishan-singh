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

  const checkboxConfigs = [
    {
      checked: true,
      disabled: true,
      label: t("labels.name"),
      onClick: undefined,
    },
    {
      checked: showEmail,
      label: t("labels.email"),
      onClick: () => setShowEmail(!showEmail),
    },
    {
      checked: showSubmissionDate,
      label: t("labels.submissionDate"),
      onClick: () => setShowSubmissionDate(!showSubmissionDate),
    },
    {
      checked: showCorrectAnswers,
      label: t("labels.correctAnswers"),
      onClick: () => setShowCorrectAnswers(!showCorrectAnswers),
    },
    {
      checked: showWrongAnswers,
      label: t("labels.wrongAnswers"),
      onClick: () => setShowWrongAnswers(!showWrongAnswers),
    },
    {
      checked: showUnanswered,
      label: t("labels.unanswered"),
      onClick: () => setShowUnanswered(!showUnanswered),
    },
    {
      checked: showQuestions,
      label: t("labels.questions"),
      onClick: () => setShowQuestions(!showQuestions),
    },
    {
      checked: showStatus,
      label: t("labels.status"),
      onClick: () => setShowStatus(!showStatus),
    },
  ];

  return (
    <Dropdown
      buttonStyle="text"
      closeOnSelect={false}
      icon={Column}
      strategy="fixed"
    >
      <div className="flex w-full flex-col items-center justify-start space-y-4 p-4">
        {checkboxConfigs.map(config => (
          <Checkbox
            checked={config.checked}
            className="w-full"
            disabled={config.disabled}
            key={config.label}
            label={config.label}
            onClick={config.onClick}
          />
        ))}
      </div>
    </Dropdown>
  );
};

export default ColumnSelector;
