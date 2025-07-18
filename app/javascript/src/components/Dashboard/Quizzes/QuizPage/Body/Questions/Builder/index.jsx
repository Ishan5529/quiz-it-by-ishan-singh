import React, { useEffect, useState } from "react";

import questionsApi from "apis/questions";
import { InlineInput } from "components/commons";
import {
  QUESTIONS_FORM_INITIAL_FORM_VALUES,
  QUESTIONS_FORM_VALIDATION_SCHEMA,
} from "components/Dashboard/Quizzes/constants";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import { useQuestionsShow } from "hooks/reactQuery/useQuestionsApi";
import { Right } from "neetoicons";
import { Typography, Button } from "neetoui";
import { useParams, useHistory } from "react-router-dom";

import OptionField from "./OptionField";

const Builder = ({ position, isEdit = false, setIsDirty }) => {
  const { slug, id } = useParams();
  const [initialValues, setInitialValues] = useState(
    QUESTIONS_FORM_INITIAL_FORM_VALUES
  );
  const [questionNumber, setQuestionNumber] = useState(position);
  const history = useHistory();

  useEffect(() => {
    if (!isEdit) {
      setQuestionNumber(position);
    }
  }, [position, isEdit]);

  const { data: { data: { question } = {} } = {} } = useQuestionsShow(
    { quizSlug: slug, id },
    { enabled: isEdit }
  );

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
      if (isEdit) {
        payload.id = id;
        await questionsApi.update(slug, id, payload);
      } else {
        payload.position = questionNumber - 1;
        await questionsApi.create(slug, payload);
      }
      setIsDirty(true);
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
          <div className="cursor-pointer" onClick={handleAllQuestionsClick}>
            All Questions
          </div>
          <Right size={20} />{" "}
          <Typography className="text-gray-500" style="h4">
            Question {questionNumber}
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
                    placeholder="Enter question title"
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
                          label="Add new option +"
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
                    label="Save"
                    style="primary"
                    type="submit"
                    onClick={() => setFieldValue("isSaveAndAddNew", false)}
                  />
                  <Button
                    className="mt-6"
                    disabled={isSubmitting || !dirty}
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
