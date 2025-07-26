import React from "react";

import { QUIZZES_FORM_INITIAL_FORM_VALUES } from "components/Dashboard/Quizzes/constants";
import { Pane, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { routes } from "routes";

import Form from "./Form";

const Create = ({ showPane, setShowPane }) => {
  const history = useHistory();

  const { t } = useTranslation();

  const handleSuccess = slug => {
    setShowPane(false);
    history.push(routes.dashboard.quizzes.edit.index.replace(":slug", slug));
  };

  const onClose = () => {
    setShowPane(false);
  };

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          {t("quizzes.add")}
        </Typography>
      </Pane.Header>
      <Form
        data={QUIZZES_FORM_INITIAL_FORM_VALUES}
        isFilter={false}
        onClose={onClose}
        onSuccess={handleSuccess}
      />
    </Pane>
  );
};

export default Create;
