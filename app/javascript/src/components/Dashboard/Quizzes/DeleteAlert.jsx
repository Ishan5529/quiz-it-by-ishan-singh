import React, { useState } from "react";

import quizzesApi from "apis/quizzes";
import { Alert } from "neetoui";

const DeleteAlert = ({
  refetch,
  onClose,
  selectedQuizIds,
  setSelectedQuizIds,
}) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await quizzesApi.destroy({ ids: selectedQuizIds });
      onClose();
      setSelectedQuizIds([]);
      refetch();
    } catch (error) {
      logger.error(error);
      setDeleting(false);
    }
  };

  return (
    <Alert
      isOpen
      isSubmitting={deleting}
      message="Are you sure you want to continue? This cannot be undone."
      title={`Delete ${selectedQuizIds.length} ${
        selectedQuizIds.length > 1 ? "quizzes" : "quiz"
      }?`}
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
