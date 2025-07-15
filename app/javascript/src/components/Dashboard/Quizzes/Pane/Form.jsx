import { QUERY_KEYS } from "constants/query";

import React from "react";

import quizzesApi from "apis/quizzes";
import { Formik, Form as FormikForm } from "formik";
import { useClearQueryClient } from "hooks/reactQuery/useClearQueryClient";
import { Pane } from "neetoui";
import { ActionBlock, Input } from "neetoui/formik";

import { QUIZZES_FORM_VALIDATION_SCHEMA } from "../constants";

const Form = ({ onClose, quiz, onSuccess }) => {
  const clearQueryClient = useClearQueryClient();

  const handleSubmit = async values => {
    try {
      const data = await quizzesApi.create(values);

      if (onSuccess) {
        clearQueryClient(QUERY_KEYS.QUIZZES);
        onSuccess(data.data.slug);
      } else {
        onClose();
      }
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <Formik
      initialValues={quiz}
      validationSchema={QUIZZES_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      <FormikForm className="w-full">
        <Pane.Body className="space-y-6">
          <Input
            required
            className="w-full flex-grow-0"
            label="Title"
            name="title"
          />
        </Pane.Body>
        <Pane.Footer>
          <ActionBlock
            cancelButtonProps={{
              onClick: onClose,
            }}
            submitButtonProps={{
              className: "mr-3",
              label: "Save",
            }}
          />
        </Pane.Footer>
      </FormikForm>
    </Formik>
  );
};

export default Form;
