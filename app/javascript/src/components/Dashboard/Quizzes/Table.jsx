import React from "react";

import { Table as NeetoUITable } from "neetoui";
import { useHistory } from "react-router-dom";

import { QUIZZES_TABLE_COLUMN_DATA } from "./constants";

const Table = ({ selectedQuizSlugs, setSelectedQuizSlugs, quizzes = [] }) => {
  const history = useHistory();

  const handleRowClick = slug => {
    history.push(`/dashboard/quizzes/${slug}/edit`);
  };

  return (
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
        onRowClick={(_, { slug }) => {
          handleRowClick(slug);
        }}
      />
    </div>
  );
};

export default Table;
