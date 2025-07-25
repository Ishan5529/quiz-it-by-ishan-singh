import React from "react";

import { Typography } from "neetoui";
import { isEmpty } from "ramda";

const SubHeaderText = ({ selectedQuizSlugs, meta }) => {
  if (!isEmpty(selectedQuizSlugs)) {
    return (
      <Typography className="flex flex-row text-gray-400" style="h4">
        <Typography className="mr-1 text-gray-600" style="h4">
          {selectedQuizSlugs.length}{" "}
          {selectedQuizSlugs.length === 1 ? "Quiz" : "Quizzes"}
        </Typography>
        {`selected of ${meta.total_count}`}
      </Typography>
    );
  }

  return (
    <Typography className="text-gray-600" style="h4">
      {meta.total_count} {meta.total_count === 1 ? "Quiz" : "Quizzes"}
    </Typography>
  );
};

export default SubHeaderText;
