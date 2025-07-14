import React, { useState } from "react";

import { Table as NeetoUITable } from "neetoui";

import { QUIZZES_TABLE_COLUMN_DATA } from "./constants";
import EditQuizPane from "./Pane/Edit";

const Table = ({
  selectedQuizSlugs,
  setSelectedQuizSlugs,
  quizzes = [],
  fetchQuizzes,
}) => {
  const [showEditQuiz, setShowEditQuiz] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  return (
    <>
      <div className="quizzes-table-height w-full">
        <NeetoUITable
          allowRowClick
          rowSelection
          columnData={QUIZZES_TABLE_COLUMN_DATA}
          // defaultPageSize={2}
          // currentPageNumber={page}
          // handlePageChange={setPage}
          rowData={quizzes}
          rowKey="slug"
          selectedRowKeys={selectedQuizSlugs}
          scroll={{
            x: "100%",
          }}
          onRowSelect={selectedRowKeys => setSelectedQuizSlugs(selectedRowKeys)}
          onRowClick={(_, quiz) => {
            setSelectedQuiz(quiz);
            setShowEditQuiz(true);
          }}
        />
      </div>
      <EditQuizPane
        fetchQuizzes={fetchQuizzes}
        quiz={selectedQuiz}
        setShowPane={setShowEditQuiz}
        showPane={showEditQuiz}
      />
    </>
  );
};

export default Table;
