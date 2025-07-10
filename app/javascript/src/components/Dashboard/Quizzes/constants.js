import * as yup from "yup";

export const QUIZZES_FORM_INITIAL_FORM_VALUES = {
  title: "",
  description: "",
};

export const QUIZZES_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

export const QUIZZES_TABLE_COLUMN_DATA = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    flex: 3,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    flex: 7,
  },
];
