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
    dataIndex: "created_on",
    key: "created_on",
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
    title: "...",
    dataIndex: "...",
    key: "...",
    width: "5%",
  },
];
