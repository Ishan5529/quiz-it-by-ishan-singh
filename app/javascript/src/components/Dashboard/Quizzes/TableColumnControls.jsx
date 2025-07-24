import React from "react";

import { Column } from "neetoicons";
import { Dropdown, Checkbox } from "neetoui";
import { useQuizTableActiveColumnsStore } from "stores/useQuizTableActiveColumnsStore";

const TableColumnControls = ({ setSelectedQuizSlugs }) => {
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
        <Checkbox checked disabled className="w-full" label="Title" />
        <Checkbox
          checked={showSubmissionCount}
          className="w-full"
          label="Submissions Count"
          onChange={e => setShowSubmissionCount(e.target.checked)}
        />
        <Checkbox
          checked={showCreatedOn}
          className="w-full"
          label="Created On"
          onChange={e => setShowCreatedOn(e.target.checked)}
        />
        <Checkbox
          checked={showStatus}
          className="w-full"
          label="Status"
          onChange={e => setShowStatus(e.target.checked)}
        />
        <Checkbox
          checked={showCategory}
          className="w-full"
          label="Category"
          onChange={e => setShowCategory(e.target.checked)}
        />
      </div>
    </Dropdown>
  );
};

export default TableColumnControls;
