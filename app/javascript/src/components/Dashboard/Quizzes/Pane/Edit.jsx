import React from "react";

import { Pane, Typography } from "neetoui";

import Form from "./Form";

const Edit = ({ showPane, setShowPane, quiz }) => {
  const onClose = () => setShowPane(false);

  return (
    <Pane isOpen={showPane} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          Edit quiz
        </Typography>
      </Pane.Header>
      <Form isEdit quiz={quiz} onClose={onClose} />
    </Pane>
  );
};

export default Edit;
