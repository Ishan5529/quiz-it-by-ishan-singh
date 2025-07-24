import { QUIZZES_TABLE_COLUMN_DATA } from "components/Dashboard/Quizzes/constants";
import { useQuizTableActiveColumnsStore } from "stores/useQuizTableActiveColumnsStore";

const useFilteredQuizTableColumns = () => {
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

export default useFilteredQuizTableColumns;
