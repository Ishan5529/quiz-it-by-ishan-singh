import { QUERY_KEYS } from "constants/query";

import React, { useState } from "react";

import quizzesApi from "apis/quizzes";
import { useClearQueryClient } from "hooks/reactQuery/useClearQueryClient";
import { Alert } from "neetoui";

const DeleteAlert = ({ onClose, selectedQuizSlugs, setSelectedQuizSlugs }) => {
  const [deleting, setDeleting] = useState(false);
  const clearQueryClient = useClearQueryClient();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await quizzesApi.destroy({ slugs: selectedQuizSlugs });
      clearQueryClient(QUERY_KEYS.QUIZZES);
      onClose();
      setSelectedQuizSlugs([]);
    } catch (error) {
      setDeleting(false);
      logger.error(error);
    }
  };

  return (
    <Alert
      isOpen
      isSubmitting={deleting}
      message="Are you sure you want to continue? This cannot be undone."
      title={`Delete ${selectedQuizSlugs.length} ${
        selectedQuizSlugs.length > 1 ? "quizzes" : "quiz"
      }?`}
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
