import { QUERY_KEYS } from "constants/query";

import React, { useState, useEffect } from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import Header from "@bigbinary/neeto-molecules/Header";
import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import SubHeader from "@bigbinary/neeto-molecules/SubHeader";
import attemptsApi from "apis/attempts";
import EmptyQuizzesListImage from "assets/images/EmptyQuizzesList";
import { Table } from "components/commons";
import EmptyState from "components/commons/EmptyState";
import SubHeaderText from "components/Dashboard/Quizzes/SubHeaderText";
import { useAttemptsFetch } from "hooks/reactQuery/useAttemptsApi";
import { useClearQueryClient } from "hooks/reactQuery/useClearQueryClient";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { Delete, Download } from "neetoicons";
import { Button, Tag, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { routes } from "routes";
import { formatTableDate, filterNonNullAndEmpty, capitalize } from "utils";
import { buildUrl } from "utils/url";

import ColumnSelector from "./ColumnSelector";
import DeleteAlert from "./DeleteAlert";
import DownloadReport from "./DownloadReport";
import FilterChips from "./FilterChips";
import StatusFilter from "./StatusFilter";

const Submissions = () => {
  const {
    searchTerm: querySearchTerm,
    page: queryPage,
    perPage: queryPerPage,
    status: queryStatus = "",
  } = useQueryParams();

  const { slug } = useParams();

  const safePage = queryPage ? Number(queryPage) : 1;
  const safePerPage = queryPerPage ? Number(queryPerPage) : 12;

  const [attemptsData, setAttemptsData] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedAttemptIds, setSelectedAttemptIds] = useState([]);
  const [tablePage, setTablePage] = useState(safePage);
  const [perPage, setPerPage] = useState(safePerPage);
  const [searchTerm, setSearchTerm] = useState(querySearchTerm);
  const [status, setStatus] = useState(queryStatus);
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  const { t } = useTranslation();

  const clearQueryClient = useClearQueryClient();

  const params = {
    page: tablePage,
    searchTerm,
    perPage,
    status,
  };

  const { data: { data: { attempts = [], meta = {} } = {} } = {}, isLoading } =
    useAttemptsFetch({
      slug,
      page: queryPage,
      per_page: queryPerPage,
      user_name: querySearchTerm,
      status: queryStatus,
    });

  const updateQueryParams = useFuncDebounce(updatedValue => {
    const updatedParam = {
      ...params,
      ...updatedValue,
      page: 1,
    };

    history.push(
      buildUrl(
        routes.dashboard.quizzes.submissions.replace(":slug", slug),
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
        routes.dashboard.quizzes.submissions.replace(":slug", slug),
        filterNonNullAndEmpty(updatedParam)
      )
    );
  };

  useEffect(() => {
    const handleTitleClick = attemptId => () => {
      const link = routes.public.quizzes.result
        .replace(":slug", slug)
        .replace(":attemptId", attemptId);
      history.push(link);
    };

    const updateRowData = () =>
      attempts.map(attempt => ({
        ...attempt,
        submission_date: formatTableDate(attempt.submission_time),
        name: (
          <div
            className="cursor-pointer"
            onClick={handleTitleClick(attempt.id)}
          >
            {attempt.user_name}
          </div>
        ),
        status: (
          <div className="flex w-full flex-row items-center justify-center">
            <Tag
              disabled
              label={capitalize(attempt.status)}
              size="large"
              style={attempt.status === "completed" ? "success" : "warning"}
              type="outline"
            />
          </div>
        ),
        email: attempt.user_email,
        correct_answers: attempt.correct_answers,
        wrong_answers: attempt.wrong_answers,
        unanswered: attempt.unanswered,
        questions: attempt.questions,
      }));

    setAttemptsData(updateRowData());
  }, [attempts]);

  const handleDelete = async () => {
    await attemptsApi.destroy({
      slug,
      attemptIds: selectedAttemptIds,
      quiet: true,
    });
    clearQueryClient(QUERY_KEYS.SUBMISSIONS);
    setSelectedAttemptIds([]);
    setShowDeleteAlert(false);
  };

  const handleDownload = () => {
    setIsOpen(true);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Container className="h-full">
      <Header
        title={t("quizzes.allSubmissions")}
        searchProps={{
          value: searchTerm,
          className: "w-72",
          placeholder: t("placeholders.names"),
          onChange: ({ target: { value } }) => setSearchTerm(value),
        }}
      />
      <SubHeader
        leftActionBlock={
          <div className="flex flex-row items-center space-x-4">
            <Typography className="text-gray-600" style="h4">
              <SubHeaderText
                meta={meta}
                plural={t("alert.submissions")}
                selectedItems={selectedAttemptIds}
                singular={t("alert.submission")}
              />
            </Typography>
            {!isEmpty(selectedAttemptIds) && (
              <div className="flex flex-row items-center space-x-2">
                <Button
                  disabled={!selectedAttemptIds.length}
                  icon={Delete}
                  label={t("labels.delete")}
                  size="small"
                  style="danger"
                  onClick={() => setShowDeleteAlert(true)}
                />
              </div>
            )}
          </div>
        }
        rightActionBlock={
          <div className="flex flex-row items-center space-x-4">
            <Button icon={Download} style="text" onClick={handleDownload} />
            <ColumnSelector />
            <StatusFilter
              setSelectedAttemptIds={setSelectedAttemptIds}
              setStatus={setStatus}
              status={status}
              updateQueryParams={updateQueryParams}
            />
          </div>
        }
      />
      <SubHeader
        leftActionBlock={
          <div className="flex flex-row space-x-4">
            <FilterChips status={status} />
          </div>
        }
      />
      {attemptsData.length ? (
        <Table
          {...{
            isSubmissions: true,
            data: attemptsData,
            meta,
            perPage,
            selectedKeys: selectedAttemptIds,
            setSelectedKeys: setSelectedAttemptIds,
            tablePage,
            handlePageChange,
          }}
        />
      ) : (
        <EmptyState
          image={<EmptyQuizzesListImage />}
          subtitle={t("quizzes.empty.submissionsDescription")}
          title={t("quizzes.empty.submissionsTitle")}
        />
      )}
      <DeleteAlert
        handleDelete={handleDelete}
        selectedAttemptIds={selectedAttemptIds}
        setShowDeleteAlert={setShowDeleteAlert}
        showDeleteAlert={showDeleteAlert}
      />
      {isOpen && <DownloadReport isOpen={isOpen} setIsOpen={setIsOpen} />}
    </Container>
  );
};

export default Submissions;
