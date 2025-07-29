import React from "react";

import { QUIZZES_FORM_VALIDATION_SCHEMA } from "components/Dashboard/Quizzes/constants";
import { Formik, Form as FormikForm } from "formik";
import { useQuizzesCreate } from "hooks/reactQuery/useQuizzesApi";
import { Pane } from "neetoui";
import { ActionBlock, Input, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";

const Form = ({
  isFilter = true,
  onClose,
  clearFilter,
  data,
  onSuccess,
  handleFilterSubmit,
  validationSchema = QUIZZES_FORM_VALIDATION_SCHEMA,
  categories = [],
}) => {
  const { t } = useTranslation();
  const { mutateAsync: createQuiz } = useQuizzesCreate();

  const handleSubmit = async values => {
    if (isFilter) {
      handleFilterSubmit(values);
      onClose();

      return;
    }

    await createQuiz(
      { quiz: values },
      {
        onSuccess: ({ data: { slug } }) => {
          onSuccess(slug);
        },
        onError: () => onClose(),
      }
    );
  };

  return (
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormikForm className="w-full">
        <Pane.Body className="space-y-6">
          <Input
            className="w-full flex-grow-0"
            label={t("labels.title")}
            name={isFilter ? "filterTitle" : "title"}
            placeholder={t("placeholders.title")}
            required={!isFilter}
          />
          {isFilter && (
            <>
              <Select
                isClearable
                className="w-full flex-grow-0"
                label={t("labels.status")}
                name="status"
                placeholder={t("placeholders.status")}
                options={[
                  { label: "Draft", value: "draft" },
                  { label: "Published", value: "published" },
                ]}
              />
              <Select
                isClearable
                isMulti
                className="w-full flex-grow-0"
                label={t("labels.category")}
                name="category"
                placeholder={t("placeholders.category")}
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
              label: isFilter ? t("labels.clearFilters") : t("labels.cancel"),
            }}
            submitButtonProps={{
              className: "mr-3",
              label: isFilter ? t("labels.done") : t("labels.save"),
            }}
          />
        </Pane.Footer>
      </FormikForm>
    </Formik>
  );
};

export default Form;
