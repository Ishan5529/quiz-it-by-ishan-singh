import React from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import Header from "@bigbinary/neeto-molecules/Header";
import profilesApi from "apis/profiles";
import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import withT from "utils/withT";

import {
  CHANGE_PASSWORD_FORM_INITIAL_VALUES,
  CHANGE_PASSWORD_FORM_VALIDATION_SCHEMA,
  CHANGE_PASSWORD_FORM_INPUT_ATTRIBUTES,
} from "./constants";

const Password = ({ t }) => {
  const handleSubmit = async (data, { resetForm }) => {
    try {
      await profilesApi.updatePassword(data);
      resetForm();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Container>
      <Header
        className="neeto-ui-border-gray-200 border-b"
        title={t("labels.changePassword")}
      />
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
        <Formik
          initialValues={CHANGE_PASSWORD_FORM_INITIAL_VALUES}
          validationSchema={CHANGE_PASSWORD_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, dirty }) => (
            <Form className="neeto-ui-rounded-lg neeto-ui-bg-white neeto-ui-shadow-s w-full space-y-6 border p-8">
              <Input
                {...CHANGE_PASSWORD_FORM_INPUT_ATTRIBUTES}
                label={t("labels.currentPassword")}
                name="currentPassword"
              />
              <Input
                {...CHANGE_PASSWORD_FORM_INPUT_ATTRIBUTES}
                label={t("labels.newPassword")}
                name="password"
              />
              <Input
                {...CHANGE_PASSWORD_FORM_INPUT_ATTRIBUTES}
                label={t("labels.confirmPassword")}
                name="passwordConfirmation"
              />
              <Button
                fullWidth
                className="h-8"
                disabled={!dirty || isSubmitting}
                label={t("labels.update")}
                loading={isSubmitting}
                name="submit"
                size="small"
                type="submit"
              />
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default withT(Password);
