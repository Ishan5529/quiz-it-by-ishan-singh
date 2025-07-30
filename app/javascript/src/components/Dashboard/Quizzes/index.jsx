import React, { useState, useEffect } from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import Header from "@bigbinary/neeto-molecules/Header";
import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import SubHeader from "@bigbinary/neeto-molecules/SubHeader";
import {
  useQuizzesFetch,
  useQuizzesBulkUpdate,
  useQuizzesClone,
} from "hooks/reactQuery/useQuizzesApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import { useQuizAlerts } from "hooks/useQuizAlerts";
import { useQuizFilters } from "hooks/useQuizFilters";
import { useQuizTableData } from "hooks/useQuizTableData";
import { Filter } from "neetoicons";
import { Button, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import { filterNonNullAndEmpty } from "utils";
import { buildUrl } from "utils/url";
import withTitle from "utils/withTitle";

import BulkActions from "./BulkActions";
import FilterChips from "./FilterChips";
import NewQuizPane from "./Pane/Create";
import FilterPane from "./Pane/Filter";
import QuizAlerts from "./QuizAlerts";
import SubHeaderText from "./SubHeaderText";
import TableColumnControls from "./TableColumnControls";
import TableContainer from "./TableContainer";

const Quizzes = () => {
  const { querySearchTerm, safePage, safePerPage, queryStatus, safeCategory } =
    useQuizFilters();

  const [showNewQuizPane, setShowNewQuizPane] = useState(false);
  const [showFilterPane, setShowFilterPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showDiscardAlert, setShowDiscardAlert] = useState(false);
  const [selectedQuizSlugs, setSelectedQuizSlugs] = useState([]);
  const [tablePage, setTablePage] = useState(safePage);
  const [perPage, setPerPage] = useState(safePerPage);
  const [searchTerm, setSearchTerm] = useState(querySearchTerm);
  const [status, setStatus] = useState(queryStatus);
  const [category, setCategory] = useState(safeCategory);

  const history = useHistory();

  const { mutate: updateBulkQuiz } = useQuizzesBulkUpdate();
  const { mutate: cloneQuiz } = useQuizzesClone();

  const { t } = useTranslation();

  useEffect(() => {
    setSelectedQuizSlugs([]);
    setStatus(queryStatus);
    setCategory(safeCategory);
  }, [querySearchTerm, queryStatus, safeCategory]);

  const params = {
    page: tablePage,
    searchTerm,
    perPage,
    status,
    category,
  };

  const { Menu, MenuItem } = Dropdown;

  const { data: { data: { quizzes = [], meta = [] } = {} } = {}, isLoading } =
    useQuizzesFetch({
      page: tablePage,
      per_page: perPage,
      title: querySearchTerm,
      status,
      category,
    });

  const updateQueryParams = useFuncDebounce(updatedValue => {
    const updatedParam = {
      ...params,
      ...updatedValue,
      page: 1,
    };

    history.push(
      buildUrl(
        routes.dashboard.quizzes.index,
        filterNonNullAndEmpty(updatedParam)
      )
    );
  });

  const handlePageChange = (page, perPage) => {
    setTablePage(page);
    setPerPage(perPage);
    const updatedParam = { ...params, page, perPage };
    history.push(
      buildUrl(
        routes.dashboard.quizzes.index,
        filterNonNullAndEmpty(updatedParam)
      )
    );
  };

  const handlePublishToggle = ({ slugs, publishedStatus }) => {
    updateBulkQuiz({
      slugs,
      quiet: true,
      payload: {
        isPublished: !publishedStatus,
        isDraft: publishedStatus,
      },
    });
  };

  const handleQuizClone = slug => {
    cloneQuiz({ slug });
  };

  const quizzesData = useQuizTableData({
    quizzes,
    history,
    handlePublishToggle,
    handleQuizClone,
    setShowDiscardAlert,
    setShowDeleteAlert,
    setSelectedQuizSlugs,
  });

  const { handleAlertSubmit } = useQuizAlerts({
    setSelectedQuizSlugs,
    setShowDeleteAlert,
    setShowDiscardAlert,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <Header
        title={t("quizzes.all")}
        actionBlock={
          <Button
            icon="ri-add-line"
            label={t("quizzes.add")}
            size="small"
            onClick={() => setShowNewQuizPane(true)}
          />
        }
        searchProps={{
          value: searchTerm,
          placeholder: t("placeholders.quizSearch"),
          onChange: ({ target: { value } }) => setSearchTerm(value),
        }}
      />
      <SubHeader
        leftActionBlock={
          <div className="flex flex-row items-center space-x-4">
            <SubHeaderText
              meta={meta}
              plural={t("labels.quizzes")}
              selectedItems={selectedQuizSlugs}
              singular={t("labels.quiz")}
            />
            <BulkActions
              {...{
                Menu,
                MenuItem,
                handlePublishToggle,
                selectedQuizSlugs,
                setSelectedQuizSlugs,
                setShowDeleteAlert,
              }}
            />
          </div>
        }
        rightActionBlock={
          <div className="flex flex-row items-center space-x-4">
            <TableColumnControls />
            <Button
              icon={Filter}
              style="text"
              onClick={() => setShowFilterPane(true)}
            />
          </div>
        }
      />
      <SubHeader leftActionBlock={<FilterChips {...{ category, status }} />} />
      <TableContainer
        {...{
          quizzesData,
          meta,
          perPage,
          selectedQuizSlugs,
          setSelectedQuizSlugs,
          tablePage,
          handlePageChange,
        }}
      />
      <NewQuizPane
        setShowPane={setShowNewQuizPane}
        showPane={showNewQuizPane}
      />
      <FilterPane
        {...{
          setShowPane: setShowFilterPane,
          showPane: showFilterPane,
          searchTerm,
          status,
          category,
          setSearchTerm,
          setStatus,
          setCategory,
          updateQueryParams,
        }}
      />
      <QuizAlerts
        {...{
          handleAlertSubmit,
          selectedQuizSlugs,
          setShowDeleteAlert,
          setShowDiscardAlert,
          showDeleteAlert,
          showDiscardAlert,
        }}
      />
    </Container>
  );
};

export default withTitle(Quizzes, "Quizzes");
