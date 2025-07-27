import React from "react";

import { Typography } from "neetoui";
import { isEmpty } from "ramda";

const SubHeaderText = ({
  selectedItems = [],
  meta,
  singular = "item",
  plural = "items",
}) => {
  if (!isEmpty(selectedItems)) {
    return (
      <Typography className="flex flex-row text-gray-400" style="h4">
        <Typography className="mr-1 text-gray-600" style="h4">
          {selectedItems.length}{" "}
          {selectedItems.length === 1 ? singular : plural}
        </Typography>
        {`selected of ${meta.total_count}`}
      </Typography>
    );
  }

  return (
    <Typography className="text-gray-600" style="h4">
      {meta.total_count} {meta.total_count === 1 ? singular : plural}
    </Typography>
  );
};

export default SubHeaderText;
