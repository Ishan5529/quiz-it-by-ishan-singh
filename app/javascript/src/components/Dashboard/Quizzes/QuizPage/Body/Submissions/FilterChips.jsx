import React from "react";

import { Typography } from "neetoui";
import { capitalize } from "utils";
import withT from "utils/withT";

const FilterChips = ({ status, t }) =>
  status ? (
    <Typography className="flex flex-row space-x-1" style="h4">
      <Typography className="text-gray-700" style="h4">
        {t("labels.status")}:
      </Typography>
      <Typography className="text-gray-400" style="h4">
        {capitalize(status)}
      </Typography>
    </Typography>
  ) : null;

export default withT(FilterChips);
