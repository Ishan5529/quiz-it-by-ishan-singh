import React from "react";

import authenticationApi from "apis/authentication";
import { useAuthDispatch } from "contexts/auth";
import { useUserDispatch } from "contexts/user";
import { Form, Formik } from "formik";
import { Button, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { routes } from "src/routes";
import withTitle from "utils/withTitle";

import {
  LOGIN_FORM_INITIAL_VALUES,
  LOGIN_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Login = ({ history }) => {
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const { t } = useTranslation();

  const handleSubmit = async ({ email, password }) => {
    try {
      const {
        data: { auth_token, user, is_admin },
      } = await authenticationApi.login({ email, password });
      authDispatch({ type: "LOGIN", payload: { auth_token, email, is_admin } });
      userDispatch({ type: "SET_USER", payload: { user } });
      history.push(routes.dashboard.index);
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
          {t("authentication.signIn")}
        </Typography>
        <Formik
          initialValues={LOGIN_FORM_INITIAL_VALUES}
          validationSchema={LOGIN_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="neeto-ui-rounded-md neeto-ui-bg-white neeto-ui-shadow-s w-full space-y-6 border p-8">
              <Input
                required
                data-cy="login-email-text-field"
                label={t("labels.email")}
                name="email"
                placeholder={t("placeholders.authEmail")}
                type="email"
              />
              <Input
                required
                data-cy="login-password-text-field"
                label={t("labels.password")}
                name="password"
                placeholder={t("placeholders.authPassword")}
                type="password"
              />
              <Button
                fullWidth
                className="h-8"
                data-cy="login-submit-button"
                disabled={isSubmitting}
                label={t("labels.login")}
                loading={isSubmitting}
                size="small"
                type="submit"
              />
            </Form>
          )}
        </Formik>
        <div className="mt-4 flex flex-col items-center justify-center space-y-2">
          <div className="flex flex-row items-center justify-start space-x-1">
            <Typography
              className="neeto-ui-text-gray-600 font-normal"
              style="body2"
            >
              {t("authentication.noAccount")}
            </Typography>
            <Button
              data-cy="sign-up-link"
              label={t("labels.signUp")}
              size="small"
              style="link"
              to={routes.auth.signup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.object,
};

export default withTitle(Login, "Login");
