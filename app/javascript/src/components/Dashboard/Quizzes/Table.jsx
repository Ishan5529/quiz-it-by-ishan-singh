import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { QUIZZES_TABLE_COLUMN_DATA } from "./constants";

const Table = ({
  meta,
  tablePage,
  perPage,
  handlePageChange,
  selectedQuizSlugs,
  setSelectedQuizSlugs,
  quizzes = [],
}) => (
  <div className="quizzes-table-height w-full">
    <NeetoUITable
      allowRowClick
      rowSelection
      columnData={QUIZZES_TABLE_COLUMN_DATA}
      currentPageNumber={tablePage}
      defaultPageSize={perPage}
      handlePageChange={handlePageChange}
      rowData={quizzes}
      rowKey="slug"
      selectedRowKeys={selectedQuizSlugs}
      totalCount={meta.total_count}
      scroll={{
        x: "100%",
      }}
      onRowSelect={selectedRowKeys => setSelectedQuizSlugs(selectedRowKeys)}
    />
  </div>
);

export default Table;
