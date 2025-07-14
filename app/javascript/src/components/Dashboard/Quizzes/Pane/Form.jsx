import { QUERY_KEYS } from "constants/query";

import React from "react";

import quizzesApi from "apis/quizzes";
import { Formik, Form as FormikForm } from "formik";
import { Pane } from "neetoui";
import { ActionBlock, Input } from "neetoui/formik";
import { useClearQueryClient } from "react-query";

import { QUIZZES_FORM_VALIDATION_SCHEMA } from "../constants";

const Form = ({ onClose, quiz, isEdit, onSuccess }) => {
  const clearQueryClient = useClearQueryClient();

  const handleSubmit = async values => {
    try {
      let data;
      if (isEdit) {
        data = await quizzesApi.update(quiz.slug, values);
      } else {
        data = await quizzesApi.create(values);
      }

      if (onSuccess) {
        clearQueryClient.invalidateQueries(QUERY_KEYS.QUIZZES);
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
              label: isEdit ? "Save changes" : "Save",
            }}
          />
        </Pane.Footer>
      </FormikForm>
    </Formik>
  );
};

export default Form;
