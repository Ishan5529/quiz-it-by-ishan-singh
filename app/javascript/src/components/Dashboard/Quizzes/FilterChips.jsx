import React from "react";

import { Typography, Button } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import { capitalize } from "utils";

const FilterChips = ({ category, status }) => {
  const history = useHistory();

  const { t } = useTranslation();

  const handleClear = () => {
    history.push(routes.dashboard.quizzes.index);
  };

  return (
    <div className="flex flex-row items-center justify-center space-x-6">
      {!isEmpty(category) && (
        <Typography className="flex flex-row space-x-1" style="h4">
          <Typography className="text-gray-700" style="h4">
            {t("labels.category")}:
          </Typography>
          <Typography className="text-gray-400" style="h4">
            {category.join(", ")}
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
      {(status || !isEmpty(category)) && (
        <Button
          label={t("labels.clearFilters")}
          style="secondary"
          onClick={handleClear}
        />
      )}
    </div>
  );
};

export default FilterChips;
