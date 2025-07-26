import React from "react";

import quizzesApi from "apis/quizzes";
import { Alert } from "neetoui";
import { getAlertTitle } from "utils";
import withT from "utils/withT";

const QuizAlerts = ({
  showDiscardAlert,
  setShowDiscardAlert,
  showDeleteAlert,
  setShowDeleteAlert,
  selectedQuizSlugs,
  handleAlertSubmit,
  t,
}) => (
  <>
    {showDiscardAlert && (
      <Alert
        isOpen={showDiscardAlert}
        message={t("alert.irreversibleWarning")}
        title={getAlertTitle(t("labels.discard"), selectedQuizSlugs.length)}
        onClose={() => setShowDiscardAlert(false)}
        onSubmit={() =>
          handleAlertSubmit(() =>
            quizzesApi.discardDraft({ slugs: selectedQuizSlugs })
          )
        }
      />
    )}
    {showDeleteAlert && (
      <Alert
        isOpen={showDeleteAlert}
        message={t("alert.irreversibleWarning")}
        title={getAlertTitle(t("labels.delete"), selectedQuizSlugs.length)}
        onClose={() => setShowDeleteAlert(false)}
        onSubmit={() =>
          handleAlertSubmit(() =>
            quizzesApi.destroy({ slugs: selectedQuizSlugs })
          )
        }
      />
    )}
  </>
);

export default withT(QuizAlerts);
