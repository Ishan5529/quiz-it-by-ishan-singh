import { QUERY_KEYS } from "constants/query";

import React from "react";

import questionsApi from "apis/questions";
import { InlineInput } from "components/commons";
import {
  QUESTIONS_FORM_INITIAL_FORM_VALUES,
  QUESTIONS_FORM_VALIDATION_SCHEMA,
} from "components/Dashboard/Quizzes/constants";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import { useClearQueryClient } from "hooks/reactQuery/useClearQueryClient";
import { Right } from "neetoicons";
import { Typography, Button } from "neetoui";
import { useParams, useHistory } from "react-router-dom";

import OptionField from "./OptionField";

const Builder = ({ questionNumber }) => {
  const { slug } = useParams();
  const history = useHistory();
  const clearQueryClient = useClearQueryClient();

  const handleQuestionsClick = () => {
    history.push(`/dashboard/quizzes/${slug}/edit`);
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
      await questionsApi.create(slug, payload);
      clearQueryClient(QUERY_KEYS.QUESTIONS);
      if (values.isSaveAndAddNew) {
        resetForm();
        history.push(`/dashboard/quizzes/${slug}/edit/add-question`);
      } else {
        history.push(`/dashboard/quizzes/${slug}/edit`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100 p-12">
      <div className="h-full w-3/4 p-6">
        <Typography
          className="mb-4 flex flex-row items-center font-medium text-gray-400"
          style="h4"
        >
          <div className="cursor-pointer" onClick={handleQuestionsClick}>
            All Questions
          </div>
          <Right size={20} />{" "}
          <Typography className="text-gray-500" style="h4">
            Question {questionNumber}
          </Typography>
        </Typography>
        <Formik
          initialValues={QUESTIONS_FORM_INITIAL_FORM_VALUES}
          validationSchema={QUESTIONS_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            isSubmitting,
          }) => (
            <FormikForm>
              <div className="body mt-10">
                <div className="border-b-2 border-gray-300 pb-4">
                  <InlineInput
                    disableHover
                    error={touched.title && errors.title}
                    name="title"
                    placeholder="Enter question title"
                    value={values.title}
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
                            errors.options &&
                            errors.options[index] && (
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
                          label="Add Option"
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
                    disabled={isSubmitting}
                    label="Save"
                    style="primary"
                    type="submit"
                    onClick={() => setFieldValue("isSaveAndAddNew", false)}
                  />
                  <Button
                    className="mt-6"
                    disabled={isSubmitting}
                    label="Save & add new question"
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

export default Builder;
