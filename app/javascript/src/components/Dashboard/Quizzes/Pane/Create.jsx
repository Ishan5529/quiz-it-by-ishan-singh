import React from "react";

import { Pane, Typography } from "neetoui";
import { useHistory } from "react-router-dom";

import Form from "./Form";

import { routes } from "../../../../routes";
import { QUIZZES_FORM_INITIAL_FORM_VALUES } from "../constants";

const Create = ({ showPane, setShowPane }) => {
  const history = useHistory();

  const handleSuccess = slug => {
    setShowPane(false);
    alert("Above");
    history.push(routes.dashboard.quizzes.edit.replace(":slug", slug));
    alert("Below");
  };

  const onClose = () => {
    setShowPane(false);
  };

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Add new quiz
        </Typography>
      </Pane.Header>
      <Form
        isEdit={false}
        quiz={QUIZZES_FORM_INITIAL_FORM_VALUES}
        onClose={onClose}
        onSuccess={handleSuccess}
      />
    </Pane>
  );
};

export default Create;
