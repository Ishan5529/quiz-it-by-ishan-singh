import React from "react";

import { Typography, Button } from "neetoui";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import { capitalize } from "utils";
import withT from "utils/withT";

const FilterChips = ({ setSearchTerm, querySearchTerm, slug, status, t }) => {
  const history = useHistory();

  const handleClear = () => {
    setSearchTerm("");
    history.push(routes.dashboard.quizzes.submissions.replace(":slug", slug));
  };

  return (
    <div className="flex flex-row items-center justify-center space-x-6">
      {querySearchTerm && (
        <Typography className="flex flex-row space-x-1" style="h4">
          <Typography className="text-gray-700" style="h4">
            {t("labels.contains")}:
          </Typography>
          <Typography className="text-gray-400" style="h4">
            {querySearchTerm}
          </Typography>
        </Typography>
      )}
      {status && (
        <Typography className="flex flex-row space-x-1" style="h4">
          <Typography className="text-gray-700" style="h4">
            {t("labels.status")}:
          </Typography>
          <Typography className="text-gray-400" style="h4">
            {capitalize(status)}
          </Typography>
        </Typography>
      )}
      {(querySearchTerm || status) && (
        <Button
          label={t("labels.clearFilters")}
          style="secondary"
          onClick={handleClear}
        />
      )}
    </div>
  );
};

export default withT(FilterChips);
