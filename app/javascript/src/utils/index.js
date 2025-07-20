import { QUIZZES_TABLE_COLUMN_DATA } from "components/Dashboard/Quizzes/constants";
import dayjs from "dayjs";
import * as R from "ramda";
import { useQuizTableActiveColumnsStore } from "stores/useQuizTableActiveColumnsStore";

import showToastr from "./showToastr";

const isPresent = R.pipe(R.either(R.isNil, R.isEmpty), R.not);

const generateDraftInfoMessage = ({ date }) => {
  const formattedDate = dayjs(date).format("hh:mmA, DD MMMM YYYY");

  return `Draft saved at ${formattedDate}`;
};

const formatTableDate = date => dayjs(date).format("DD MMMM YYYY, hh:mm A");

const getAlertTitle = (action, count) =>
  `${action} ${count} ${count > 1 ? "quizzes" : "quiz"}?`;

export const useFilteredQuizTableColumns = () => {
  const { showSubmissionCount, showCreatedOn, showStatus, showCategory } =
    useQuizTableActiveColumnsStore();

  return QUIZZES_TABLE_COLUMN_DATA.filter(col => {
    if (col.dataIndex === "submision_count" && !showSubmissionCount) {
      return false;
    }

    if (col.dataIndex === "created_at" && !showCreatedOn) return false;

    if (col.dataIndex === "status" && !showStatus) return false;

    if (col.dataIndex === "category" && !showCategory) return false;

    return true;
  });
};

export {
  showToastr,
  isPresent,
  generateDraftInfoMessage,
  formatTableDate,
  getAlertTitle,
};
