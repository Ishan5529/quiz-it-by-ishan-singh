import React, { useEffect, useState } from "react";

import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import { InlineInput } from "components/commons";
import {
  QUESTIONS_FORM_INITIAL_FORM_VALUES,
  QUESTIONS_FORM_VALIDATION_SCHEMA,
} from "components/Dashboard/Quizzes/constants";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import {
  useQuestionsShow,
  useQuestionsCreate,
  useQuestionsUpdate,
} from "hooks/reactQuery/useQuestionsApi";
import { Right } from "neetoicons";
import { Typography, Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useParams, useHistory } from "react-router-dom";
import { routes } from "routes";
import withTitle from "utils/withTitle";

import OptionField from "./OptionField";

const Builder = ({ position, isEdit = false, setIsDirty }) => {
  const { slug, id } = useParams();

  const [initialValues, setInitialValues] = useState(
    QUESTIONS_FORM_INITIAL_FORM_VALUES
  );
  const [questionNumber, setQuestionNumber] = useState(position);
  const history = useHistory();

  const { t } = useTranslation();

  const { mutate: createQuestion } = useQuestionsCreate();
  const { mutate: updateQuestion } = useQuestionsUpdate();

  useEffect(() => {
    if (!isEdit) {
      setQuestionNumber(position);
    }
  }, [position, isEdit]);

  const { data: { data: { question } = {} } = {}, isLoading } =
    useQuestionsShow({ quizSlug: slug, id }, { enabled: isEdit });

  useEffect(() => {
    if (question) {
      setQuestionNumber(question.position + 1);
      setInitialValues({
        title: question.title,
        options: question.options,
        correctOption: question.correct_option - 1,
        isSaveAndAddNew: false,
      });
    }
  }, [question]);

  const handleAllQuestionsClick = () => {
    const link = routes.dashboard.quizzes.edit.index.replace(":slug", slug);
    history.push(link);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const validOptions = values.options.filter(option => option.trim() !== "");
    const payload = {
      title: values.title,
      options: validOptions,
      correct_option: values.correctOption + 1,
      quiz_slug: slug,
      question_number: questionNumber,
    };
    try {
      if (isEdit) {
        payload.id = id;
        updateQuestion({ slug, id, payload });
      } else {
        payload.position = questionNumber - 1;
        createQuestion({ slug, payload });
      }
      setIsDirty(true);
      if (values.isSaveAndAddNew) {
        resetForm();
        const link = routes.dashboard.quizzes.edit.addQuestion.replace(
          ":slug",
          slug
        );
        history.push(link);
      } else {
        const link = routes.dashboard.quizzes.edit.index.replace(":slug", slug);
        history.push(link);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100 p-12">
      <div className="h-full w-3/4 p-6">
        <Typography
          className="mb-4 flex flex-row items-center font-medium text-gray-400"
          style="h4"
        >
          <div className="cursor-pointer" onClick={handleAllQuestionsClick}>
            {t("quizzes.questions.all")}
          </div>
          <Right size={20} />{" "}
          <Typography className="text-gray-500" style="h4">
            {t("quizzes.questions.index")} {questionNumber}
          </Typography>
        </Typography>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={QUESTIONS_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldValue,
            isSubmitting,
            dirty,
          }) => (
            <FormikForm>
              <div className="body mt-10">
                <div className="border-b-2 border-gray-300 pb-4">
                  <InlineInput
                    disableHover
                    error={touched.title && errors.title}
                    name="title"
                    placeholder={t("placeholders.questionTitle")}
                    value={values.title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.title && errors.title && (
                    <div className="mt-1 text-xs text-red-500">
                      {errors.title}
                    </div>
                  )}
                </div>
                <FieldArray name="options">
                  {({ push, remove }) => (
                    <div className="options mt-8 w-full space-y-3">
                      {values.options.map((option, index) => (
                        <div key={index}>
                          <div
                            className="flex w-full items-center space-x-3 rounded-lg bg-white px-3 hover:outline"
                            key={index}
                          >
                            <input
                              checked={values.correctOption === index}
                              className="cursor-pointer"
                              name="correctOption"
                              type="radio"
                              onChange={() =>
                                setFieldValue("correctOption", index)
                              }
                            />
                            <OptionField
                              index={index}
                              isDeleteDisabled={values.options.length <= 2}
                              minimumOptions="two"
                              option={option}
                              handleDelete={() => {
                                if (values.options.length > 2) remove(index);
                              }}
                              handleOptionChange={(idx, value) =>
                                setFieldValue(`options[${idx}]`, value)
                              }
                            />
                          </div>
                          {touched.options &&
                            touched.options[index] &&
                            Array.isArray(errors.options) &&
                            errors.options[index] &&
                            typeof errors.options[index] === "string" && (
                              <div className="mt-1 text-xs text-red-500">
                                {errors.options[index]}
                              </div>
                            )}
                        </div>
                      ))}
                      <div>
                        <Button
                          className="mt-4"
                          disabled={values.options.length >= 6}
                          label={t("labels.addOption")}
                          style="link"
                          onClick={() => push("")}
                        />
                        {errors.options &&
                          typeof errors.options === "string" && (
                            <div className="mt-2 text-xs text-red-500">
                              {errors.options}
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </FieldArray>
                {touched.correctOption && errors.correctOption && (
                  <div className="mt-2 text-xs text-red-500">
                    {errors.correctOption}
                  </div>
                )}
                <div className="mt-6 flex flex-row space-x-3">
                  <Button
                    className="mt-6"
                    disabled={isSubmitting || !dirty}
                    label={t("labels.save")}
                    style="primary"
                    type="submit"
                    onClick={() => setFieldValue("isSaveAndAddNew", false)}
                  />
                  <Button
                    className="mt-6"
                    disabled={isSubmitting || !dirty}
                    label={t("labels.saveAndAddNewQuestion")}
                    style="secondary"
                    type="submit"
                    onClick={() => setFieldValue("isSaveAndAddNew", true)}
                  />
                </div>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default withTitle(Builder, "Question Builder");
