import React, { useState } from "react";

import notesApi from "apis/notes";
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
      await notesApi.destroy({ ids: selectedQuizIds });
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
