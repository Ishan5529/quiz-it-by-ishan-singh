import { t } from "i18next";
import * as yup from "yup";

export const PROFILE_FORM_VALIDATION_SCHEMA = yup.object().shape({
  firstName: yup.string().required(t("yup.required")),
  lastName: yup.string().required(t("yup.required")),
});

export const PASSWORD_VALIDATION_SCHEMA = yup.object().shape({
  password: yup.string().required(t("yup.required")),
});

export const EMAIL_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email(t("yup.string.email")).required(t("yup.required")),
});

export const PASSWORD_CONFIRMATION_FORM_INITIAL_VALUES = {
  password: "",
};

export const CHANGE_PASSWORD_FORM_INITIAL_VALUES = {
  currentPassword: "",
  password: "",
  passwordConfirmation: "",
};

export const CHANGE_PASSWORD_FORM_VALIDATION_SCHEMA = yup.object({
  currentPassword: yup.string().required(t("yup.string.currentPassword")),
  password: yup.string().required(t("yup.string.newPassword")),
  passwordConfirmation: yup
    .string()
    .required(t("yup.string.confirmPassword"))
    .oneOf([yup.ref("password"), null], t("yup.string.passwordConfirmation")),
});

export const CHANGE_PASSWORD_FORM_INPUT_ATTRIBUTES = {
  type: "password",
  "aria-required": "true",
  placeholder: t("placeholders.authPassword"),
};
