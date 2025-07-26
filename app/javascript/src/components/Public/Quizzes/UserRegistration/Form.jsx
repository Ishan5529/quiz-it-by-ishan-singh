import React from "react";
import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import PropTypes from "prop-types";
import withT from "utils/withT";

import {
  REGISTRATION_FORM_INITIAL_VALUES,
  REGISTRATION_FORM_VALIDATION_SCHEMA,
} from "components/Public/constants";

const UserRegistrationForm = ({ onSubmit, isSubmitting, t }) => (
  <Formik
    initialValues={REGISTRATION_FORM_INITIAL_VALUES}
    validationSchema={REGISTRATION_FORM_VALIDATION_SCHEMA}
    validateOnChange={false}
    onSubmit={onSubmit}
  >
    {() => (
      <Form className="space-y-6">
        <div className="flex flex-row space-x-4">
          <Input
            required
            label={t("labels.fullName")}
            name="firstName"
            placeholder={t("placeholders.authFirstName")}
            className="w-1/2"
          />
          <Input
            label="&nbsp;"
            name="lastName"
            placeholder={t("placeholders.authLastName")}
            className="w-1/2"
          />
        </div>
        <Input
          required
          label={t("labels.emailAddress")}
          name="email"
          placeholder={t("placeholders.authEmail")}
          type="email"
        />
        <Button
          fullWidth
          className="h-10"
          data-cy="start-quiz-button"
          disabled={isSubmitting}
          label={t("labels.startQuiz")}
          loading={isSubmitting}
          size="large"
          type="submit"
          style="primary"
        />
      </Form>
    )}
  </Formik>
);

UserRegistrationForm.propTypes = {
  quiz: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

export default withT(UserRegistrationForm);
