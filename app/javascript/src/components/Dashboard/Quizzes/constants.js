import * as yup from "yup";

export const QUIZZES_FORM_INITIAL_FORM_VALUES = {
  title: "",
};

export const QUIZZES_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export const QUIZZES_TABLE_COLUMN_DATA = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: "29%",
  },
  {
    title: "Submission Count",
    dataIndex: "submision_count",
    key: "submission_count",
    width: "19%",
  },
  {
    title: "Created On",
    dataIndex: "created_at",
    key: "created_at",
    width: "14%",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "14%",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: "19%",
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    width: "5%",
  },
];

export const QUESTIONS_FORM_INITIAL_FORM_VALUES = {
  title: "",
  options: ["", "", "", ""],
  correctOption: null,
  isSaveAndAddNew: false,
};

export const QUESTIONS_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required"),
  options: yup
    .array()
    .of(
      yup
        .string()
        .required("Option cannot be empty")
        .test(
          "not-empty-or-spaces",
          "Option cannot be empty",
          value => !!value && value.trim().length > 0
        )
    )
    .min(2, "At least 2 options required")
    .max(6, "Maximum 6 options allowed"),
  correctOption: yup
    .number()
    .typeError("Select the correct option")
    .required("Select the correct option")
    .min(0, "Select the correct option")
    .when("options", (options, schema) =>
      schema.max(options.length - 1, "Select the correct option")
    )
    .nullable(),
});
