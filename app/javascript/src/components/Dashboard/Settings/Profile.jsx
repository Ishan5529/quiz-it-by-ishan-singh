import React, { useMemo } from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import Header from "@bigbinary/neeto-molecules/Header";
import profilesApi from "apis/profiles";
import { useUserState, useUserDispatch } from "contexts/user";
import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import ConfirmPasswordFormModal from "./ConfirmPasswordFormModal";
import { PROFILE_FORM_VALIDATION_SCHEMA } from "./constants";
import { useFormikPasswordConfirmationModal } from "./hooks/useFormikPasswordConfirmationModal";
import { buildProfileFormInitialValues } from "./utils";

const Profile = () => {
  const formikPasswordContext = useFormikPasswordConfirmationModal();
  const { user } = useUserState();

  const { t } = useTranslation();

  const userDispatch = useUserDispatch();
  const initialFormValues = useMemo(
    () => buildProfileFormInitialValues(user),
    [user]
  );

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const {
        data: { user },
      } = await profilesApi.updateProfile({
        ...values,
        password: formikPasswordContext.password,
      });
      userDispatch({ type: "SET_USER", payload: { user } });
    } catch (err) {
      resetForm();
      formikPasswordContext.setShowPasswordModal(false);
      logger.error(err);
    }
  };

  const promptPassword = async (e, validateForm) => {
    e.preventDefault();
    const { firstName, lastName } = await validateForm();
    if (!firstName && !lastName) {
      formikPasswordContext.setShowPasswordModal(true);
    }
  };

  return (
    <Container>
      <Header
        className="neeto-ui-border-gray-200 border-b"
        title={t("labels.myProfile")}
      />
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
        <Formik
          enableReinitialize
          initialValues={initialFormValues}
          innerRef={formikPasswordContext.formRef}
          validationSchema={PROFILE_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ dirty, isSubmitting, validateForm }) => (
            <Form className="neeto-ui-rounded-lg neeto-ui-bg-white neeto-ui-shadow-s w-full space-y-6 border p-8">
              <Input required label={t("labels.firstName")} name="firstName" />
              <Input required label={t("labels.lastName")} name="lastName" />
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
          header={t("alert.passwordConfirmation")}
          isOpen={formikPasswordContext.showPasswordModal}
          onClose={formikPasswordContext.closeModal}
          onSubmit={formikPasswordContext.handlePasswordConfirmation}
        />
      </div>
    </Container>
  );
};

export default Profile;
