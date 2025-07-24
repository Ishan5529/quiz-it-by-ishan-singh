import * as yup from "yup";

export const QUIZZES_FORM_INITIAL_FORM_VALUES = {
  title: "",
};

export const QUIZZES_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export const QUIZZES_FILTER_FORM_VALIDATION_SCHEMA = yup.object().shape({
  filterTitle: yup.string(),
  status: yup.object().nullable(),
  category: yup.object().nullable(),
});

export const QUIZZES_TABLE_COLUMN_DATA = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: "auto",
  },
  {
    title: "Submission Count",
    dataIndex: "submission_count",
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

export const SUBMISSIONS_TABLE_COLUMN_DATA = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "auto",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "20%",
  },
  {
    title: "Submmission Date",
    dataIndex: "submission_date",
    key: "submission_date",
    width: "13%",
  },
  {
    title: "Correct Answers",
    dataIndex: "correct_answers",
    key: "correct_answers",
    width: "10%",
  },
  {
    title: "Wrong Answers",
    dataIndex: "wrong_answers",
    key: "wrong_answers",
    width: "10%",
  },
  {
    title: "Unanswered",
    dataIndex: "unanswered",
    key: "unanswered",
    width: "10%",
  },
  {
    title: "Questions",
    dataIndex: "questions",
    key: "questions",
    width: "10%",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "7%",
  },
];
