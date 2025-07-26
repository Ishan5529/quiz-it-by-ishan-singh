import React from "react";

import { Filter } from "neetoicons";
import { Dropdown, Checkbox, Typography } from "neetoui";
import { isEmpty } from "ramda";
import withT from "utils/withT";

const StatusFilter = ({
  status,
  setStatus,
  updateQueryParams,
  setSelectedAttemptIds,
  t,
}) => {
  const determineStatus = action => {
    if (!isEmpty(status)) return "";

    return action === "completed" ? "incomplete" : "completed";
  };

  return (
    <Dropdown
      buttonStyle="text"
      closeOnSelect={false}
      icon={Filter}
      strategy="fixed"
      onClick={() => setSelectedAttemptIds([])}
    >
      <div className="flex w-full flex-col items-center justify-start space-y-4 p-4">
        <div className="w-full text-left text-gray-700">
          <Typography style="h4">{t("filter.select.status")}:</Typography>
        </div>
        <div className="flex w-full flex-row space-x-4 pb-2">
          <Checkbox
            checked={status === "completed" || isEmpty(status)}
            className="w-full"
            label={t("labels.completed")}
            onChange={() => {
              const newStatus = determineStatus("completed");
              setStatus(newStatus);
              updateQueryParams({ status: newStatus });
            }}
          />
          <Checkbox
            checked={status === "incomplete" || isEmpty(status)}
            className="w-full"
            label={t("labels.incomplete")}
            onChange={() => {
              const newStatus = determineStatus("incomplete");
              setStatus(newStatus);
              updateQueryParams({ status: newStatus });
            }}
          />
        </div>
      </div>
    </Dropdown>
  );
};

export default withT(StatusFilter);
