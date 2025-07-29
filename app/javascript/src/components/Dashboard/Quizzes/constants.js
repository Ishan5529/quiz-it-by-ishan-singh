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

export const categories = ["Science", "History", "Programming"];

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
    .max(6, t("yup.string.maxOptions", { count: 6 }))
    .test(
      "unique-options",
      t("yup.string.uniqueOptions"),
      options =>
        new Set(
          options.filter(option => !!option).map(v => v.trim().toLowerCase())
        ).size === options.length
    ),
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

export const STATUS_TAGS = {
  draft: {
    condition: quiz => quiz.isDraft,
    label: t("labels.draft"),
    style: "warning",
  },
  published: {
    condition: quiz => quiz.isPublished,
    label: t("labels.published"),
    style: "info",
  },
};

export const getQuizMenuItems =
  ({
    handlePublishToggle,
    handleQuizClone,
    setShowDiscardAlert,
    setShowDeleteAlert,
    setSelectedQuizSlugs,
  }) =>
  quiz =>
    [
      {
        label: quiz.isPublished ? t("labels.unpublish") : t("labels.publish"),
        onClick: () => {
          handlePublishToggle({
            slugs: quiz.slug,
            publishedStatus: quiz.isPublished,
          });
        },
      },
      {
        label: t("labels.clone"),
        onClick: () => handleQuizClone(quiz.slug),
      },
      { type: "divider" },
      ...(quiz.isDraft
        ? [
            {
              label: t("labels.discardDraft"),
              style: "danger",
              onClick: () => {
                setShowDiscardAlert(true);
                setSelectedQuizSlugs([quiz.slug]);
              },
            },
          ]
        : []),
      {
        label: t("labels.delete"),
        style: "danger",
        onClick: () => {
          setShowDeleteAlert(true);
          setSelectedQuizSlugs([quiz.slug]);
        },
      },
    ];
