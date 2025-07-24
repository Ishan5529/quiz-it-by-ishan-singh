import React from "react";

import useFilteredQuizTableColumns from "hooks/useFilteredQuizTableColumns";
import useFilteredSubmissionsTableColumns from "hooks/useFilteredSubmissionsTableColumns";
import { Table as NeetoUITable } from "neetoui";

const Table = ({
  isSubmissions = false,
  meta,
  tablePage,
  perPage,
  handlePageChange,
  selectedKeys,
  setSelectedKeys,
  data = [],
}) => {
  const QUIZZES_TABLE_COLUMN_DATA = useFilteredQuizTableColumns();
  const SUBMISSIONS_TABLE_COLUMN_DATA = useFilteredSubmissionsTableColumns();

  return (
    <div className="quizzes-table-height w-full">
      <NeetoUITable
        allowRowClick
        rowSelection
        currentPageNumber={tablePage}
        defaultPageSize={perPage}
        handlePageChange={handlePageChange}
        rowData={data}
        rowKey={isSubmissions ? "id" : "slug"}
        selectedRowKeys={selectedKeys}
        totalCount={meta.total_count}
        columnData={
          isSubmissions
            ? SUBMISSIONS_TABLE_COLUMN_DATA
            : QUIZZES_TABLE_COLUMN_DATA
        }
        scroll={{
          x: "100%",
        }}
        onRowSelect={selectedRowKeys => setSelectedKeys(selectedRowKeys)}
      />
    </div>
  );
};

export default Table;
