import React from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import Header from "@bigbinary/neeto-molecules/Header";
import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import { Form, Formik } from "formik";
import {
  useOrganizationsShow,
  useOrganizationsUpdate,
} from "hooks/reactQuery/useOrganizationsApi";
import { Button } from "neetoui";
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
        title={t("labels.updateOrganization")}
      />
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
        <Formik
          enableReinitialize
          initialValues={initialFormValues}
          validationSchema={ORGANIZATION_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ dirty, isSubmitting }) => (
            <Form className="neeto-ui-rounded-lg neeto-ui-bg-white neeto-ui-shadow-s w-full space-y-6 border p-8">
              <Input
                required
                label={t("labels.organization")}
                name="organization"
                type="name"
              />
              <Button
                fullWidth
                className="h-8"
                disabled={!dirty || isSubmitting}
                label={t("labels.update")}
                loading={isSubmitting}
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

export default Organization;
