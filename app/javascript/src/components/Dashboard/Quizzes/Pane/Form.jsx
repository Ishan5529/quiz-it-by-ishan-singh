import { QUERY_KEYS } from "constants/query";

import React from "react";

import quizzesApi from "apis/quizzes";
import { Formik, Form as FormikForm } from "formik";
import { useClearQueryClient } from "hooks/reactQuery/useClearQueryClient";
import { Pane } from "neetoui";
import { ActionBlock, Input, Select } from "neetoui/formik";

import { QUIZZES_FORM_VALIDATION_SCHEMA } from "../constants";

const Form = ({
  isFilter = true,
  onClose,
  clearFilter,
  quiz,
  onSuccess,
  handleFilterSubmit,
  validationSchema = QUIZZES_FORM_VALIDATION_SCHEMA,
  categories = [],
}) => {
  const clearQueryClient = useClearQueryClient();

  const handleSubmit = async values => {
    if (isFilter) {
      handleFilterSubmit(values);
      onClose();

      return;
    }
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
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormikForm className="w-full">
        <Pane.Body className="space-y-6">
          <Input
            className="w-full flex-grow-0"
            label="Title"
            name={isFilter ? "filterTitle" : "title"}
            placeholder="Enter title"
            required={!isFilter}
          />
          {isFilter && (
            <>
              <Select
                isClearable
                className="w-full flex-grow-0"
                label="Status"
                name="status"
                placeholder="Select status"
                options={[
                  { label: "Draft", value: "draft" },
                  { label: "Published", value: "published" },
                ]}
              />
              <Select
                isClearable
                isMulti
                className="w-full flex-grow-0"
                label="Category"
                name="category"
                placeholder="Select category"
                options={categories.map(category => ({
                  label: category,
                  value: category,
                }))}
              />
            </>
          )}
        </Pane.Body>
        <Pane.Footer>
          <ActionBlock
            cancelButtonProps={{
              onClick: isFilter ? clearFilter : onClose,
              label: isFilter ? "Clear filters" : "Cancel",
            }}
            submitButtonProps={{
              className: "mr-3",
              label: isFilter ? "Done" : "Save",
            }}
          />
        </Pane.Footer>
      </FormikForm>
    </Formik>
  );
};

export default Form;
