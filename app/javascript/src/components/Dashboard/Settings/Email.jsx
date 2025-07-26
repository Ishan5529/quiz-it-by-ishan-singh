import React, { useMemo } from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import Header from "@bigbinary/neeto-molecules/Header";
import profilesApi from "apis/profiles";
import { useAuthDispatch } from "contexts/auth";
import { useUserState } from "contexts/user";
import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { routes } from "routes";

import ConfirmPasswordFormModal from "./ConfirmPasswordFormModal";
import { EMAIL_FORM_VALIDATION_SCHEMA } from "./constants";
import { useFormikPasswordConfirmationModal } from "./hooks/useFormikPasswordConfirmationModal";
import { buildEmailFormInitialValues } from "./utils";

const Email = () => {
  const formikPasswordContext = useFormikPasswordConfirmationModal();
  const { user } = useUserState();

  const { t } = useTranslation();

  const authDispatch = useAuthDispatch();
  const initialFormValues = useMemo(
    () => buildEmailFormInitialValues(user),
    [user]
  );

  const handleSubmit = async (data, { resetForm }) => {
    try {
      await profilesApi.updateEmail({
        ...data,
        password: formikPasswordContext.password,
      });
      authDispatch({ type: "LOGOUT" });
      window.location.href = routes.auth.login;
    } catch (err) {
      resetForm();
      formikPasswordContext.setShowPasswordModal(false);
      logger.error(err);
    }
  };

  const promptPassword = async (e, validateForm) => {
    e.preventDefault();
    const { email } = await validateForm();
    if (!email) formikPasswordContext.setShowPasswordModal(true);
  };

  return (
    <Container>
      <Header
        className="neeto-ui-border-gray-200 border-b"
        title={t("labels.updateEmail")}
      />
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
        <Formik
          initialValues={initialFormValues}
          innerRef={formikPasswordContext.formRef}
          validationSchema={EMAIL_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ dirty, isSubmitting, validateForm }) => (
            <Form className="neeto-ui-rounded-lg neeto-ui-bg-white neeto-ui-shadow-s w-full space-y-6 border p-8">
              <Input
                required
                label={t("labels.email")}
                name="email"
                type="email"
              />
              <Button
                fullWidth
                className="h-8"
                disabled={!dirty || isSubmitting}
                label={t("labels.update")}
                loading={isSubmitting}
                size="small"
                type="submit"
                onClick={e => promptPassword(e, validateForm)}
              />
            </Form>
          )}
        </Formik>
        <ConfirmPasswordFormModal
          alertMessage={t("alert.emailUpdateWarning")}
          header={t("alert.emailUpdateTitle")}
          isOpen={formikPasswordContext.showPasswordModal}
          onClose={formikPasswordContext.closeModal}
          onSubmit={formikPasswordContext.handlePasswordConfirmation}
        />
      </div>
    </Container>
  );
};

export default Email;
