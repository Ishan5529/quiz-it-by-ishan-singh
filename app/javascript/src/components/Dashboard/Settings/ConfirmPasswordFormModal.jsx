import React, { useEffect, useRef } from "react";

import { Form, Formik } from "formik";
import { Button, Modal, Typography } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import {
  PASSWORD_CONFIRMATION_FORM_INITIAL_VALUES,
  PASSWORD_VALIDATION_SCHEMA,
} from "./constants";

const ConfirmPasswordFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  header = "",
  alertMessage = "",
}) => {
  const innerRef = useRef();

  const { t } = useTranslation();

  useEffect(() => {
    innerRef.current?.resetForm?.();
  }, [isOpen]);

  return (
    <Formik
      initialValues={PASSWORD_CONFIRMATION_FORM_INITIAL_VALUES}
      innerRef={innerRef}
      validationSchema={PASSWORD_VALIDATION_SCHEMA}
      onSubmit={onSubmit}
    >
      {({ values, isSubmitting, handleSubmit }) => (
        <Modal isOpen={isOpen} onClose={onClose}>
          <Modal.Header>
            <Typography style="h2">{header}</Typography>
          </Modal.Header>
          <Form>
            <Modal.Body>
              {alertMessage && <p className="my-2">{alertMessage}</p>}
              <Input
                autoFocus
                required
                className="my-2"
                label={t("labels.currentPassword")}
                name="password"
                type="password"
              />
            </Modal.Body>
            <Modal.Footer className="space-x-2">
              <Button
                disabled={isSubmitting || !values.password}
                label={t("labels.continue")}
                loading={isSubmitting}
                type="submit"
                onClick={handleSubmit}
              />
              <Button
                disabled={isSubmitting}
                label={t("labels.cancel")}
                style="text"
                type="reset"
                onClick={onClose}
              />
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default ConfirmPasswordFormModal;
