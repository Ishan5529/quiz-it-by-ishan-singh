import React from "react";

import EmptyQuizzesListImage from "assets/images/EmptyQuizzesList";
import { Table } from "components/commons";
import EmptyState from "components/commons/EmptyState";

const TableContainer = ({
  quizzesData,
  meta,
  perPage,
  selectedQuizSlugs,
  setSelectedQuizSlugs,
  tablePage,
  handlePageChange,
  setShowNewQuizPane,
}) =>
  quizzesData.length ? (
    <Table
      {...{
        data: quizzesData,
        meta,
        perPage,
        selectedKeys: selectedQuizSlugs,
        setSelectedKeys: setSelectedQuizSlugs,
        tablePage,
        handlePageChange,
      }}
    />
  ) : (
    <EmptyState
      image={<EmptyQuizzesListImage />}
      primaryAction={() => setShowNewQuizPane(true)}
      primaryActionLabel="Add new quiz"
      subtitle="Create a quiz to get started."
      title="Looks like you don't have any quizzes!"
    />
  );

export default TableContainer;
