import { SUBMISSIONS_TABLE_COLUMN_DATA } from "components/Dashboard/Quizzes/constants";
import { useSubmissionTableActiveColumnsStore } from "stores/useSubmissionTableActiveColumnsStore";

const useFilteredSubmissionsTableColumns = () => {
  const {
    showEmail,
    showCorrectAnswers,
    showWrongAnswers,
    showUnanswered,
    showQuestions,
    showStatus,
    showSubmissionDate,
  } = useSubmissionTableActiveColumnsStore();

  return SUBMISSIONS_TABLE_COLUMN_DATA.filter(col => {
    if (col.dataIndex === "submission_date" && !showSubmissionDate) {
      return false;
    }

    if (col.dataIndex === "email" && !showEmail) return false;

    if (col.dataIndex === "correct_answers" && !showCorrectAnswers) {
      return false;
    }

    if (col.dataIndex === "wrong_answers" && !showWrongAnswers) return false;

    if (col.dataIndex === "questions" && !showQuestions) return false;

    if (col.dataIndex === "unanswered" && !showUnanswered) return false;

    if (col.dataIndex === "status" && !showStatus) return false;

    return true;
  });
};

export default useFilteredSubmissionsTableColumns;
