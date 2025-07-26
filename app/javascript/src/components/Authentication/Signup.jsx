import React from "react";

import authenticationApi from "apis/authentication";
import { Form, Formik } from "formik";
import { Button, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import PropTypes from "prop-types";
import { routes } from "src/routes";
import withT from "utils/withT";

import {
  SIGNUP_FORM_INITIAL_VALUES,
  SIGNUP_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Signup = ({ history, t }) => {
  const handleSubmit = async formData => {
    try {
      await authenticationApi.signup({ ...formData, role: "super_admin" });
      history.push(routes.auth.login);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="neeto-ui-bg-gray-100 flex h-screen w-screen flex-row items-center justify-center overflow-y-auto overflow-x-hidden p-6">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
        <Typography
          className="neeto-ui-text-gray-800 mb-5 text-center text-3xl font-extrabold"
          style="h2"
        >
          {t("authentication.signUp")}
        </Typography>
        <Formik
          initialValues={SIGNUP_FORM_INITIAL_VALUES}
          validationSchema={SIGNUP_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="neeto-ui-rounded-md neeto-ui-bg-white neeto-ui-shadow-s w-full space-y-6 border p-8">
              <Input
                required
                label={t("labels.email")}
                name="email"
                placeholder={t("placeholders.authEmail")}
                type="email"
              />
              <Input
                required
                label={t("labels.firstName")}
                name="firstName"
                placeholder={t("placeholders.authFirstName")}
                type="text"
              />
              <Input
                required
                label={t("labels.lastName")}
                name="lastName"
                placeholder={t("placeholders.authLastName")}
                type="text"
              />
              <Input
                required
                label={t("labels.password")}
                name="password"
                placeholder={t("placeholders.authPassword")}
                type="password"
              />
              <Input
                required
                label={t("labels.passwordConfirmation")}
                name="passwordConfirmation"
                placeholder={t("placeholders.authPasswordConfirmation")}
                type="password"
              />
              <Button
                fullWidth
                className="h-8"
                disabled={isSubmitting}
                label={t("labels.signUp")}
                loading={isSubmitting}
                size="small"
                type="submit"
              />
            </Form>
          )}
        </Formik>
        <div className="mt-4 flex flex-row items-center justify-start space-x-1">
          <Typography
            className="neeto-ui-text-gray-600 font-normal"
            style="body2"
          >
            {t("authentication.existingAccount")}
          </Typography>
          <Button
            label={t("labels.login")}
            size="small"
            style="link"
            to={routes.auth.login}
          />
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {
  history: PropTypes.object,
};

export default withT(Signup);
