import React, { useState } from "react";

import { Table as NeetoUITable } from "neetoui";

import { QUIZZES_TABLE_COLUMN_DATA } from "./constants";
import EditNotePane from "./Pane/Edit";

const Table = ({
  selectedQuizIds,
  setSelectedQuizIds,
  quizzes = [],
  fetchQuizzes,
}) => {
  const [showEditQuiz, setShowEditQuiz] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  return (
    <>
      <div className="notes-table-height w-full">
        <NeetoUITable
          allowRowClick
          rowSelection
          columnData={QUIZZES_TABLE_COLUMN_DATA}
          rowData={quizzes}
          selectedRowKeys={selectedQuizIds}
          onRowSelect={selectedRowKeys => setSelectedQuizIds(selectedRowKeys)}
          onRowClick={(_, quiz) => {
            setSelectedQuiz(quiz);
            setShowEditQuiz(true);
          }}
        />
      </div>
      <EditNotePane
        fetchQuizzes={fetchQuizzes}
        quiz={selectedQuiz}
        setShowPane={setShowEditQuiz}
        showPane={showEditQuiz}
      />
    </>
  );
};

export default Table;
