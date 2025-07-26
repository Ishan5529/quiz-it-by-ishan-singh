import React from "react";

import { Alert } from "neetoui";
import { getAlertTitle } from "utils";

const DeleteAlert = ({
  showDeleteAlert,
  setShowDeleteAlert,
  selectedAttemptIds,
  handleAlertSubmit,
  attemptsApi,
  slug,
}) => (
  <Alert
    isOpen={showDeleteAlert}
    message="Are you sure you want to continue? This cannot be undone."
    title={getAlertTitle(
      "Delete",
      selectedAttemptIds.length,
      "submission",
      "submissions"
    )}
    onClose={() => setShowDeleteAlert(false)}
    onSubmit={() =>
      handleAlertSubmit(() =>
        attemptsApi.destroy({
          slug,
          attemptIds: selectedAttemptIds,
          quiet: true,
        })
      )
    }
  />
);

export default DeleteAlert;
