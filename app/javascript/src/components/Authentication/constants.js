import { t } from "i18next";
import * as yup from "yup";

export const LOGIN_FORM_INITIAL_VALUES = {
  email: "",
  password: "",
};

export const SIGNUP_FORM_INITIAL_VALUES = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordConfirmation: "",
};

export const LOGIN_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email(t("yup.string.email")).required(t("yup.required")),
  password: yup.string().required(t("yup.required")),
});

export const SIGNUP_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email(t("yup.string.email")).required(t("yup.required")),
  firstName: yup.string().required(t("yup.required")),
  lastName: yup.string().required(t("yup.required")),
  password: yup.string().required(t("yup.required")),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], t("yup.string.passwordConfirmation"))
    .required(t("yup.required")),
});
