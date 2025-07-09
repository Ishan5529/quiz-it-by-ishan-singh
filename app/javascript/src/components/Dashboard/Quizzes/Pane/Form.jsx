import React from "react";

import notesApi from "apis/notes";
import { Formik, Form as FormikForm } from "formik";
import { Pane } from "neetoui";
import { ActionBlock, Input, Textarea } from "neetoui/formik";

import { QUIZZES_FORM_VALIDATION_SCHEMA } from "../constants";

const Form = ({ onClose, refetch, quiz, isEdit }) => {
  const handleSubmit = async values => {
    try {
      if (isEdit) {
        await notesApi.update(quiz.id, values);
      } else {
        await notesApi.create(values);
      }
      refetch();
      onClose();
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
          <Textarea
            required
            className="w-full flex-grow-0"
            label="Description"
            name="description"
            rows={8}
          />
        </Pane.Body>
        <Pane.Footer>
          <ActionBlock
            cancelButtonProps={{
              onClick: onClose,
            }}
            submitButtonProps={{
              className: "mr-3",
            }}
          />
        </Pane.Footer>
      </FormikForm>
    </Formik>
  );
};

export default Form;
