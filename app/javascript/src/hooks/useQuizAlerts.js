import { QUERY_KEYS } from "constants/query";

import { useCallback } from "react";

import { useClearQueryClient } from "hooks/reactQuery/useClearQueryClient";

export const useQuizAlerts = ({
  setSelectedQuizSlugs,
  setShowDeleteAlert,
  setShowDiscardAlert,
}) => {
  const clearQueryClient = useClearQueryClient();

  const handleAlertSubmit = useCallback(
    async action => {
      await action();
      clearQueryClient(QUERY_KEYS.QUIZZES);
      clearQueryClient(QUERY_KEYS.QUESTIONS);
      setSelectedQuizSlugs([]);
      setShowDeleteAlert(false);
      setShowDiscardAlert(false);
    },
    [
      clearQueryClient,
      setSelectedQuizSlugs,
      setShowDeleteAlert,
      setShowDiscardAlert,
    ]
  );

  return { handleAlertSubmit };
};
