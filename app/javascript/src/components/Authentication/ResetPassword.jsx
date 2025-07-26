import React from "react";

import { Form, Formik } from "formik";
import { Button, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import { routes } from "src/routes";
import withT from "utils/withT";

import {
  RESET_PASSWORD_FORM_INITIAL_VALUES,
  RESET_PASSWORD_FORM_VALIDATION_SCHEMA,
} from "./constants";

const ResetPassword = ({ t }) => (
  <div className="neeto-ui-bg-gray-100 flex h-screen w-screen flex-row items-center justify-center overflow-y-auto overflow-x-hidden p-6">
    <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
      <Typography
        className="neeto-ui-text-gray-800 mb-5 text-center text-3xl font-extrabold"
        style="h2"
      >
        {t("authentication.forgotPassword")}
      </Typography>
      <div className="neeto-ui-text-gray-700 -mt-4 mb-5 w-2/3 text-center">
        {t("authentication.forgotPasswordDescription")}
      </div>
      <Formik
        initialValues={RESET_PASSWORD_FORM_INITIAL_VALUES}
        validationSchema={RESET_PASSWORD_FORM_VALIDATION_SCHEMA}
        onSubmit={() => null}
      >
        {({ isSubmitting }) => (
          <Form
            className="neeto-ui-rounded-md neeto-ui-bg-white neeto-ui-shadow-s w-full space-y-6 border p-8"
            id="new_user"
          >
            <Input
              required
              label={t("labels.email")}
              name="email"
              type="email"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <Button
                fullWidth
                className="h-8"
                data-disable-with="Send reset password email"
                disabled={isSubmitting}
                label={t("authentication.sendResetPasswordEmail")}
                loading={isSubmitting}
                size="small"
                type="submit"
              />
              <Button
                label={t("labels.back")}
                size="small"
                style="link"
                to={routes.auth.login}
              />
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-4 flex flex-row items-center justify-start space-x-1">
        <Typography
          className="neeto-ui-text-gray-600 font-normal"
          style="body2"
        >
          {t("authentication.noAccount")}
        </Typography>
        <Button
          label={t("labels.signUp")}
          size="small"
          style="link"
          to={routes.auth.signup}
        />
      </div>
    </div>
  </div>
);

export default withT(ResetPassword);
