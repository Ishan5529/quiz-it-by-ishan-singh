import React from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import Header from "@bigbinary/neeto-molecules/Header";
import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import { Form, Formik } from "formik";
import {
  useOrganizationsShow,
  useOrganizationsUpdate,
} from "hooks/reactQuery/useOrganizationsApi";
import { Button, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { ORGANIZATION_FORM_VALIDATION_SCHEMA } from "./constants";

const Organization = () => {
  const { t } = useTranslation();

  const { mutate: updateOrganization } = useOrganizationsUpdate();

  const {
    data: { data: { organization: organizationData } = {} } = {},
    isLoading,
  } = useOrganizationsShow();

  if (isLoading) {
    return <PageLoader />;
  }

  const initialFormValues = { organization: organizationData?.name || "" };

  const handleSubmit = (data, { resetForm }) => {
    updateOrganization({ name: data.organization }, { onError: resetForm });
  };

  return (
    <Container>
      <Header
        className="neeto-ui-border-gray-200 border-b"
        title={
          <Typography style="h1">
            {t("labels.general")}
            <Typography style="body1">
              {t("labels.customizeQuizSiteName")}
            </Typography>
          </Typography>
        }
      />
      <div className="mt-4 w-2/5">
        <Formik
          enableReinitialize
          initialValues={initialFormValues}
          validationSchema={ORGANIZATION_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ dirty, isSubmitting }) => (
            <Form className="neeto-ui-rounded-lg neeto-ui-bg-white w-full space-y-6 p-8">
              <Input
                required
                label={t("labels.organizationName")}
                name="organization"
                placeholder={t("placeholders.organization")}
                size="large"
                type="name"
              />
              <Button
                className="h-8"
                disabled={!dirty || isSubmitting}
                label={t("labels.saveChanges")}
                loading={isSubmitting}
                size="small"
                type="submit"
              />
              <Button
                className="ml-4 h-8"
                disabled={!dirty || isSubmitting}
                label={t("labels.cancel")}
                loading={isSubmitting}
                size="small"
                style="secondary"
                type="reset"
              />
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Organization;
