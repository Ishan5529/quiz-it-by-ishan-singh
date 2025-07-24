import React from "react";

import { Typography } from "neetoui";
import { isEmpty } from "ramda";
import { capitalize } from "utils";

const FilterChips = ({ category, status }) => (
  <div className="flex flex-row space-x-4">
    {!isEmpty(category) && (
      <Typography className="flex flex-row space-x-1" style="h4">
        <Typography className="text-gray-700" style="h4">
          Category:
        </Typography>
        <Typography className="text-gray-400" style="h4">
          {category.join(", ")}
        </Typography>
      </Typography>
    )}
    {status && (
      <Typography className="flex flex-row space-x-1" style="h4">
        <Typography className="text-gray-700" style="h4">
          Status:
        </Typography>
        <Typography className="text-gray-400" style="h4">
          {capitalize(status)}
        </Typography>
      </Typography>
    )}
  </div>
);

export default FilterChips;
