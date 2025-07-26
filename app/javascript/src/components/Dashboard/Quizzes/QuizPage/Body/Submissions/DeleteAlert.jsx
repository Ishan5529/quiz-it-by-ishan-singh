import React from "react";

import { Alert } from "neetoui";
import { getAlertTitle } from "utils";
import withT from "utils/withT";

const DeleteAlert = ({
  showDeleteAlert,
  setShowDeleteAlert,
  selectedAttemptIds,
  handleDelete,
  t,
}) => (
  <Alert
    isOpen={showDeleteAlert}
    message={t("alert.irreversibleWarning")}
    title={getAlertTitle(
      t("labels.delete"),
      selectedAttemptIds.length,
      t("alert.submission"),
      t("alert.submissions")
    )}
    onClose={() => setShowDeleteAlert(false)}
    onSubmit={handleDelete}
  />
);

export default withT(DeleteAlert);
