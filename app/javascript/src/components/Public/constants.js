import * as yup from "yup";

export const REGISTRATION_FORM_INITIAL_VALUES = {
  email: "",
  firstName: "",
  lastName: "",
};

export const REGISTRATION_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
});
