import { useEffect, useState } from "react";

import { routes } from "routes";
import { getQuizTableRowData } from "utils/getQuizTableRowData";

export const useQuizTableData = ({
  quizzes,
  history,
  handlePublishToggle,
  handleQuizClone,
  setShowDiscardAlert,
  setShowDeleteAlert,
  setSelectedQuizSlugs,
}) => {
  const [quizzesData, setQuizzesData] = useState([]);

  const handleTitleClick = slug => () => {
    const link = routes.dashboard.quizzes.edit.index.replace(":slug", slug);
    history.push(link);
  };

  useEffect(() => {
    setQuizzesData(
      getQuizTableRowData({
        quizzes,
        handleTitleClick,
        handlePublishToggle,
        handleQuizClone,
        setShowDiscardAlert,
        setShowDeleteAlert,
        setSelectedQuizSlugs,
      })
    );
  }, [quizzes]);

  return quizzesData;
};
