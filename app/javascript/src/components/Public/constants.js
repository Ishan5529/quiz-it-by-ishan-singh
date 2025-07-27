import * as yup from "yup";
import { t } from "i18next";

export const REGISTRATION_FORM_INITIAL_VALUES = {
  email: "",
  firstName: "",
  lastName: "",
};

export const REGISTRATION_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email(t("yup.string.email")).required(t("yup.required")),
  firstName: yup.string().required(t("yup.required")),
  lastName: yup.string().required(t("yup.required")),
});
