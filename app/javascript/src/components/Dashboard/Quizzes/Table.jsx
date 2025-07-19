import React, { useState } from "react";

import { Table as NeetoUITable } from "neetoui";

import { QUIZZES_TABLE_COLUMN_DATA } from "./constants";

const Table = ({ selectedQuizSlugs, setSelectedQuizSlugs, quizzes = [] }) => {
  const [tablePage, setTablePage] = useState(1);

  return (
    <div className="quizzes-table-height w-full">
      <NeetoUITable
        allowRowClick
        rowSelection
        columnData={QUIZZES_TABLE_COLUMN_DATA}
        currentPageNumber={tablePage}
        defaultPageSize={12}
        handlePageChange={setTablePage}
        rowData={quizzes}
        rowKey="slug"
        selectedRowKeys={selectedQuizSlugs}
        scroll={{
          x: "100%",
        }}
        onRowSelect={selectedRowKeys => setSelectedQuizSlugs(selectedRowKeys)}
      />
    </div>
  );
};

export default Table;
