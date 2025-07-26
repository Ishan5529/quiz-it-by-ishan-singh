import { t } from "i18next";
import * as yup from "yup";

export const QUIZZES_FORM_INITIAL_FORM_VALUES = {
  title: "",
};

export const QUIZZES_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required(t("yup.string.title")),
});

export const QUIZZES_FILTER_FORM_VALIDATION_SCHEMA = yup.object().shape({
  filterTitle: yup.string(),
  status: yup.object().nullable(),
  category: yup.object().nullable(),
});

export const categories = ["General", "Science", "Math", "History", "Finance"];

export const QUIZZES_TABLE_COLUMN_DATA = [
  {
    title: t("labels.title"),
    dataIndex: "title",
    key: "title",
    width: "auto",
  },
  {
    title: t("labels.submissionCount"),
    dataIndex: "submission_count",
    key: "submission_count",
    width: "19%",
  },
  {
    title: t("labels.createdOn"),
    dataIndex: "created_at",
    key: "created_at",
    width: "14%",
  },
  {
    title: t("labels.status"),
    dataIndex: "status",
    key: "status",
    width: "14%",
  },
  {
    title: t("labels.category"),
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
  title: yup.string().required(t("yup.string.title")),
  options: yup
    .array()
    .of(
      yup
        .string()
        .required(t("yup.string.option"))
        .test(
          "not-empty-or-spaces",
          t("yup.string.option"),
          value => !!value && value.trim().length > 0
        )
    )
    .min(2, t("yup.string.minOptions", { count: 2 }))
    .max(6, t("yup.string.maxOptions", { count: 6 })),
  correctOption: yup
    .number()
    .typeError(t("yup.string.correctOption"))
    .required(t("yup.string.correctOption"))
    .min(0, t("yup.string.correctOption"))
    .when("options", (options, schema) =>
      schema.max(options.length - 1, t("yup.string.correctOption"))
    )
    .nullable(),
});

export const SUBMISSIONS_TABLE_COLUMN_DATA = [
  {
    title: t("labels.name"),
    dataIndex: "name",
    key: "name",
    width: "auto",
  },
  {
    title: t("labels.email"),
    dataIndex: "email",
    key: "email",
    width: "20%",
  },
  {
    title: t("labels.submissionDate"),
    dataIndex: "submission_date",
    key: "submission_date",
    width: "13%",
  },
  {
    title: t("labels.correctAnswers"),
    dataIndex: "correct_answers",
    key: "correct_answers",
    width: "10%",
  },
  {
    title: t("labels.wrongAnswers"),
    dataIndex: "wrong_answers",
    key: "wrong_answers",
    width: "10%",
  },
  {
    title: t("labels.unanswered"),
    dataIndex: "unanswered",
    key: "unanswered",
    width: "10%",
  },
  {
    title: t("labels.questions"),
    dataIndex: "questions",
    key: "questions",
    width: "10%",
  },
  {
    title: t("labels.status"),
    dataIndex: "status",
    key: "status",
    width: "7%",
  },
];

export const REPORT_PDF_NAME = "quiz_submission_report.pdf";
