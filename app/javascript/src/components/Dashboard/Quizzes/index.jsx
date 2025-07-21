import { QUERY_KEYS } from "constants/query";

import React, { useState, useEffect } from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import Header from "@bigbinary/neeto-molecules/Header";
import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import SubHeader from "@bigbinary/neeto-molecules/SubHeader";
import quizzesApi from "apis/quizzes";
import EmptyQuizzesListImage from "assets/images/EmptyQuizzesList";
import EmptyState from "components/commons/EmptyState";
import { useClearQueryClient } from "hooks/reactQuery/useClearQueryClient";
import { useQuizzesFetch } from "hooks/reactQuery/useQuizzesApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { Delete, MenuHorizontal, Filter, Column } from "neetoicons";
import { Alert, Button, Tag, Dropdown, Checkbox } from "neetoui";
import { Typography } from "neetoui/index";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import { useQuizTableActiveColumnsStore } from "stores/useQuizTableActiveColumnsStore";
import {
  formatTableDate,
  getAlertTitle,
  filterNonNullAndEmpty,
  capitalize,
} from "utils";
import { buildUrl } from "utils/url";

import NewQuizPane from "./Pane/Create";
import FilterPane from "./Pane/Filter";
import Table from "./Table";

3;

const Quizzes = () => {
  const {
    searchTerm: querySearchTerm,
    page: queryPage,
    perPage: queryPerPage,
    status: queryStatus,
    category: queryCategory,
  } = useQueryParams();

  const safePage = queryPage ? Number(queryPage) : 1;
  const safePerPage = queryPerPage ? Number(queryPerPage) : 12;
  let safeCategory = [];
  if (Array.isArray(queryCategory)) {
    safeCategory = queryCategory;
  } else if (queryCategory) {
    safeCategory = [queryCategory];
  }

  const [quizzesData, setQuizzesData] = useState([]);
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

  const {
    showSubmissionCount,
    showCreatedOn,
    showStatus,
    showCategory,
    setShowSubmissionCount,
    setShowCreatedOn,
    setShowStatus,
    setShowCategory,
  } = useQuizTableActiveColumnsStore();

  const history = useHistory();

  const clearQueryClient = useClearQueryClient();

  const params = {
    page: tablePage,
    searchTerm,
    perPage,
    status,
    category,
  };

  const { Menu, MenuItem, Divider } = Dropdown;

  const { data: { data: { quizzes = [], meta = [] } = {}, isLoading } = {} } =
    useQuizzesFetch({
      page: queryPage,
      per_page: queryPerPage,
      title: querySearchTerm,
      status: queryStatus,
      category: queryCategory,
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

  const handlePublishToggle = async ({ slugs, publishedStatus }) => {
    await quizzesApi.update({
      slugs,
      quiet: true,
      payload: {
        isPublished: !publishedStatus,
        isDraft: publishedStatus,
      },
    });
    clearQueryClient(QUERY_KEYS.QUIZZES);
  };

  useEffect(() => {
    const handleTitleClick = slug => () => {
      history.push(`/dashboard/quizzes/${slug}/edit`);
    };

    const handleQuizClone = () => {
      history.push(`/dashboard/quizzes/clone`);
    };

    const updateRowData = () =>
      quizzes.map(quiz => ({
        ...quiz,
        created_at: formatTableDate(quiz.created_at),
        category: quiz.category.name,
        title: (
          <div className="cursor-pointer" onClick={handleTitleClick(quiz.slug)}>
            {quiz.title}
          </div>
        ),
        status: (
          <div className="flex flex-row items-center space-x-2">
            {quiz.isDraft && (
              <Tag
                disabled
                label="Draft"
                size="large"
                style="warning"
                type="outline"
              />
            )}
            {quiz.isPublished && (
              <Tag
                disabled
                label="Published"
                size="large"
                style="info"
                type="outline"
              />
            )}
          </div>
        ),
        actions: (
          <div className="flex w-full items-center justify-between">
            <Dropdown
              buttonStyle="text"
              icon={MenuHorizontal}
              strategy="fixed"
              onClick={() => setSelectedQuizSlugs([quiz.slug])}
            >
              <Menu>
                <MenuItem.Button
                  onClick={() => {
                    handlePublishToggle({
                      slugs: quiz.slug,
                      publishedStatus: quiz.isPublished,
                    });
                    setSelectedQuizSlugs([]);
                  }}
                >
                  {quiz.isPublished ? "Unpublish" : "Publish"}
                </MenuItem.Button>
                <MenuItem.Button onClick={handleQuizClone}>
                  Clone
                </MenuItem.Button>
                <Divider />
                {quiz.isDraft && (
                  <MenuItem.Button
                    style="danger"
                    onClick={() => {
                      setShowDiscardAlert(true);
                      setSelectedQuizSlugs([quiz.slug]);
                    }}
                  >
                    Discard draft
                  </MenuItem.Button>
                )}
                <MenuItem.Button
                  style="danger"
                  onClick={() => setShowDeleteAlert(true)}
                >
                  Delete
                </MenuItem.Button>
              </Menu>
            </Dropdown>
          </div>
        ),
      }));

    setQuizzesData(updateRowData());
  }, [quizzes]);

  const handleAlertSubmit = async action => {
    await action();
    clearQueryClient(QUERY_KEYS.QUIZZES);
    clearQueryClient(QUERY_KEYS.QUESTIONS);
    setSelectedQuizSlugs([]);
    setShowDeleteAlert(false);
    setShowDiscardAlert(false);
  };

  const subHeaderText = () => {
    if (!isEmpty(selectedQuizSlugs)) {
      return (
        <Typography className="flex flex-row text-gray-400" style="h4">
          <Typography className="mr-1 text-gray-600" style="h4">
            {selectedQuizSlugs.length}{" "}
            {selectedQuizSlugs.length === 1 ? "Quiz" : "Quizzes"}
          </Typography>
          {`selected of ${meta.total_count}`}
        </Typography>
      );
    }

    return (
      <Typography className="text-gray-600" style="h4">
        {meta.total_count} {meta.total_count === 1 ? "Quiz" : "Quizzes"}
      </Typography>
    );
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <Header
        title="All Quizzes"
        actionBlock={
          <Button
            icon="ri-add-line"
            label="Add new quiz"
            size="small"
            onClick={() => setShowNewQuizPane(true)}
          />
        }
        searchProps={{
          value: searchTerm,
          placeholder: "Search quizzes",
          onChange: e => setSearchTerm(e.target.value),
        }}
      />
      <SubHeader
        leftActionBlock={
          <div className="flex flex-row items-center space-x-4">
            <Typography className="text-gray-600" style="h4">
              {subHeaderText()}
            </Typography>
            {!isEmpty(selectedQuizSlugs) && (
              <div className="flex flex-row items-center space-x-2">
                <Dropdown
                  buttonStyle="secondary"
                  label="Change Status"
                  strategy="fixed"
                >
                  <Menu>
                    <MenuItem.Button
                      onClick={() => {
                        handlePublishToggle({
                          slugs: selectedQuizSlugs,
                          publishedStatus: true,
                        });
                        setSelectedQuizSlugs([]);
                      }}
                    >
                      Draft
                    </MenuItem.Button>
                    <MenuItem.Button
                      onClick={() => {
                        handlePublishToggle({
                          slugs: selectedQuizSlugs,
                          publishedStatus: false,
                        });
                        setSelectedQuizSlugs([]);
                      }}
                    >
                      Publish
                    </MenuItem.Button>
                  </Menu>
                </Dropdown>
                <Button
                  disabled={!selectedQuizSlugs.length}
                  icon={Delete}
                  label="Delete"
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
            <Dropdown
              buttonStyle="text"
              closeOnSelect={false}
              icon={Column}
              strategy="fixed"
              onClick={() => setSelectedQuizSlugs([])}
            >
              <div className="flex w-full flex-col items-center justify-start space-y-4 p-4">
                <Checkbox checked disabled className="w-full" label="Title" />
                <Checkbox
                  checked={showSubmissionCount}
                  className="w-full"
                  label="Submissions Count"
                  onChange={e => setShowSubmissionCount(e.target.checked)}
                />
                <Checkbox
                  checked={showCreatedOn}
                  className="w-full"
                  label="Created On"
                  onChange={e => setShowCreatedOn(e.target.checked)}
                />
                <Checkbox
                  checked={showStatus}
                  className="w-full"
                  label="Status"
                  onChange={e => setShowStatus(e.target.checked)}
                />
                <Checkbox
                  checked={showCategory}
                  className="w-full"
                  label="Category"
                  onChange={e => setShowCategory(e.target.checked)}
                />
              </div>
            </Dropdown>
            <Button
              icon={Filter}
              style="text"
              onClick={() => setShowFilterPane(true)}
            />
          </div>
        }
      />
      <SubHeader
        leftActionBlock={
          <div className="flex flex-row space-x-4">
            {!isEmpty(category) && (
              <Typography className="flex flex-row space-x-1" style="h4">
                <Typography className="text-gray-700" style="h4">
                  Category:
                </Typography>
                <Typography className="text-gray-400" style="h4">
                  {category.join(", ")}
                </Typography>
              </Typography>
            )}
            {status && (
              <Typography className="flex flex-row space-x-1" style="h4">
                <Typography className="text-gray-700" style="h4">
                  Status:
                </Typography>
                <Typography className="text-gray-400" style="h4">
                  {capitalize(status)}
                </Typography>
              </Typography>
            )}
          </div>
        }
      />
      {quizzesData.length ? (
        <Table
          {...{
            quizzes: quizzesData,
            meta,
            perPage,
            selectedQuizSlugs,
            setSelectedQuizSlugs,
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
      )}
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
      {showDiscardAlert && (
        <Alert
          isOpen={showDiscardAlert}
          message="Are you sure you want to continue? This cannot be undone."
          title={getAlertTitle("Discard", selectedQuizSlugs.length)}
          onClose={() => setShowDiscardAlert(false)}
          onSubmit={() =>
            handleAlertSubmit(() =>
              quizzesApi.discardDraft({ slugs: selectedQuizSlugs })
            )
          }
        />
      )}
      {showDeleteAlert && (
        <Alert
          isOpen={showDeleteAlert}
          message="Are you sure you want to continue? This cannot be undone."
          title={getAlertTitle("Delete", selectedQuizSlugs.length)}
          onClose={() => setShowDeleteAlert(false)}
          onSubmit={() =>
            handleAlertSubmit(() =>
              quizzesApi.destroy({ slugs: selectedQuizSlugs })
            )
          }
        />
      )}
    </Container>
  );
};

export default Quizzes;
