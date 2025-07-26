import React from "react";

import { Column } from "neetoicons";
import { Dropdown, Checkbox } from "neetoui";
import { useQuizTableActiveColumnsStore } from "stores/useQuizTableActiveColumnsStore";
import withT from "utils/withT";

const TableColumnControls = ({ setSelectedQuizSlugs, t }) => {
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

  return (
    <Dropdown
      buttonStyle="text"
      closeOnSelect={false}
      icon={Column}
      strategy="fixed"
      onClick={() => setSelectedQuizSlugs([])}
    >
      <div className="flex w-full flex-col items-center justify-start space-y-4 p-4">
        <Checkbox
          checked
          disabled
          className="w-full"
          label={t("labels.title")}
        />
        <Checkbox
          checked={showSubmissionCount}
          className="w-full"
          label={t("labels.submissionCount")}
          onClick={() => setShowSubmissionCount(!showSubmissionCount)}
        />
        <Checkbox
          checked={showCreatedOn}
          className="w-full"
          label={t("labels.createdOn")}
          onClick={() => setShowCreatedOn(!showCreatedOn)}
        />
        <Checkbox
          checked={showStatus}
          className="w-full"
          label={t("labels.status")}
          onClick={() => setShowStatus(!showStatus)}
        />
        <Checkbox
          checked={showCategory}
          className="w-full"
          label={t("labels.category")}
          onClick={() => setShowCategory(!showCategory)}
        />
      </div>
    </Dropdown>
  );
};

export default withT(TableColumnControls);
