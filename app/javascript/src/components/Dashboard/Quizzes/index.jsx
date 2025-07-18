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
import { Delete, MenuHorizontal } from "neetoicons";
import { Button, Tag, Dropdown } from "neetoui";
import { useHistory } from "react-router-dom";
import { formatTableDate } from "utils";

import DeleteAlert from "./DeleteAlert";
import NewQuizPane from "./Pane/Create";
import Table from "./Table";

3;

const Quizzes = () => {
  const [quizzesData, setQuizzesData] = useState([]);
  const [showNewQuizPane, setShowNewQuizPane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedQuizSlugs, setSelectedQuizSlugs] = useState([]);

  const history = useHistory();

  const clearQueryClient = useClearQueryClient();

  const { Menu, MenuItem, Divider } = Dropdown;
  // const { searchKey = "", status = "", category = "" } = useQueryParams();

  const [searchTerm, setSearchTerm] = useState("");

  const { data: { data: { quizzes = [] } = {}, isLoading } = {} } =
    useQuizzesFetch();

  const handlePublishClick = async slugs => {
    await quizzesApi.update({
      slugs,
      quiet: true,
      payload: { isPublished: true, isDraft: false },
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
              onClose={() => setSelectedQuizSlugs([])}
            >
              <Menu>
                <MenuItem.Button onClick={() => handlePublishClick(quiz.slug)}>
                  {quiz.isPublished ? "Unpublish" : "Publish"}
                </MenuItem.Button>
                <MenuItem.Button onClick={handleQuizClone}>
                  Clone
                </MenuItem.Button>
                <Divider />
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
          onChange: e => setSearchTerm(e.target.value),
        }}
      />
      {quizzesData.length ? (
        <>
          <SubHeader
            rightActionBlock={
              <Button
                disabled={!selectedQuizSlugs.length}
                icon={Delete}
                label="Delete"
                size="small"
                onClick={() => setShowDeleteAlert(true)}
              />
            }
          />
          <Table
            quizzes={quizzesData}
            selectedQuizSlugs={selectedQuizSlugs}
            setSelectedQuizSlugs={setSelectedQuizSlugs}
          />
        </>
      ) : (
        <EmptyState
          image={<EmptyQuizzesListImage />}
          primaryAction={() => setShowNewQuizPane(true)}
          primaryActionLabel="Add new quiz"
          subtitle="Create your first quiz to get started."
          title="Looks like you don't have any quizzes!"
        />
      )}
      <NewQuizPane
        setShowPane={setShowNewQuizPane}
        showPane={showNewQuizPane}
      />
      {showDeleteAlert && (
        <DeleteAlert
          selectedQuizSlugs={selectedQuizSlugs}
          setSelectedQuizSlugs={setSelectedQuizSlugs}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
    </Container>
  );
};

export default Quizzes;
