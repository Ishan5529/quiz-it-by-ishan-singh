import React, { useState } from "react";

import quizzesApi from "apis/quizzes";
import { Alert } from "neetoui";

const DeleteAlert = ({ onClose, selectedQuizSlugs, setSelectedQuizSlugs }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await quizzesApi.destroy({ slugs: selectedQuizSlugs });
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
