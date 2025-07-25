import React from "react";

import { Alert } from "neetoui";
import { getAlertTitle } from "utils";

const QuizAlerts = ({
  showDiscardAlert,
  setShowDiscardAlert,
  showDeleteAlert,
  setShowDeleteAlert,
  selectedQuizSlugs,
  handleAlertSubmit,
  quizzesApi,
}) => (
  <>
    {showDiscardAlert && (
      <Alert
        isOpen={showDiscardAlert}
        message="Are you sure you want to continue? This cannot be undone."
        title={getAlertTitle("Discard", selectedQuizSlugs.length)}
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
        message="Are you sure you want to continue? This cannot be undone."
        title={getAlertTitle("Delete", selectedQuizSlugs.length)}
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

export default QuizAlerts;
