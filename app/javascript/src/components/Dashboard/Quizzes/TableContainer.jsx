import React from "react";

import EmptyQuizzesListImage from "assets/images/EmptyQuizzesList";
import { Table } from "components/commons";
import EmptyState from "components/commons/EmptyState";
import withT from "utils/withT";

const TableContainer = ({
  quizzesData,
  meta,
  perPage,
  selectedQuizSlugs,
  setSelectedQuizSlugs,
  tablePage,
  handlePageChange,
  setShowNewQuizPane,
  t,
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
      primaryActionLabel={t("quizzes.add")}
      subtitle={t("quizzes.empty.quizzesDescription")}
      title={t("quizzes.empty.quizzesTitle")}
    />
  );

export default withT(TableContainer);
