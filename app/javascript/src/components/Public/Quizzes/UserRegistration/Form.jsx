import React from "react";
import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import PropTypes from "prop-types";

import {
  REGISTRATION_FORM_INITIAL_VALUES,
  REGISTRATION_FORM_VALIDATION_SCHEMA,
} from "components/Public/constants";

const UserRegistrationForm = ({ quiz, onSubmit, isSubmitting }) => (
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
            label="Full name"
            name="firstName"
            placeholder="First name"
            className="w-1/2"
          />
          <Input
            label="&nbsp;"
            name="lastName"
            placeholder="Last name"
            className="w-1/2"
          />
        </div>
        <Input
          required
          label="Email address"
          name="email"
          placeholder="oliver@example.com"
          type="email"
        />
        <Button
          fullWidth
          className="h-10"
          data-cy="start-quiz-button"
          disabled={isSubmitting}
          label="Start quiz"
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

export default UserRegistrationForm;
