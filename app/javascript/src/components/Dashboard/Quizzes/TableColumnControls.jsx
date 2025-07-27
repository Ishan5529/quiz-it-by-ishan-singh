import React, { useMemo } from "react";

import { Column } from "neetoicons";
import { Dropdown, Checkbox } from "neetoui";
import { useQuizTableActiveColumnsStore } from "stores/useQuizTableActiveColumnsStore";
import withT from "utils/withT";

const TableColumnControls = ({ t }) => {
  const {
    showSubmissionCount,
    showCreatedOn,
    showStatus,
    showCategory,
    setShowSubmissionCount,
    setShowCreatedOn,
    setShowStatus,
    setShowCategory,
  } = useQuizTableActiveColumnsStore();

  const checkboxConfigs = useMemo(
    () => [
      {
        checked: true,
        disabled: true,
        label: t("labels.title"),
        onClick: undefined,
      },
      {
        checked: showSubmissionCount,
        label: t("labels.submissionCount"),
        onClick: () => setShowSubmissionCount(!showSubmissionCount),
      },
      {
        checked: showCreatedOn,
        label: t("labels.createdOn"),
        onClick: () => setShowCreatedOn(!showCreatedOn),
      },
      {
        checked: showStatus,
        label: t("labels.status"),
        onClick: () => setShowStatus(!showStatus),
      },
      {
        checked: showCategory,
        label: t("labels.category"),
        onClick: () => setShowCategory(!showCategory),
      },
    ],
    [
      t,
      showSubmissionCount,
      showCreatedOn,
      showStatus,
      showCategory,
      setShowSubmissionCount,
      setShowCreatedOn,
      setShowStatus,
      setShowCategory,
    ]
  );

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

export default withT(TableColumnControls);
