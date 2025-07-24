import { useEffect, useState } from "react";

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

  useEffect(() => {
    const handleTitleClick = slug => () => {
      history.push(`/dashboard/quizzes/${slug}/edit`);
    };

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
